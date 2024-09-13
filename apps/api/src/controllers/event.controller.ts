import { Request, Response } from "express";
import prisma from "../prisma";
import path from 'path';
import fs from 'fs';
import { Category, EventType, TierName } from "@prisma/client";
import { Formidable, File } from 'formidable';

export class EventController {
    async createEvent(req: Request, res: Response) {
        const uploadDir = path.resolve(__dirname, '../../../web/mini-project/public');

        const form = new Formidable({
            uploadDir: uploadDir,
            keepExtensions: true,
            multiples: false
        });

        form.parse(req, (err, fields , files: any) => {
            if (err) {
                return res.status(400).json({ message: 'Error parsing the form', error: err.message });
            }
            
            if (!files.image) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Get uploaded file info
            const fileArray = files.image as File[];
            const file = fileArray && fileArray.length > 0 ? fileArray[0] : undefined;
            if (!file) {
                return res.status(400).json({ message: 'File upload failed or file is missing' });
              }

            const filePath = file.filepath || file.newFilename;
    
            if (!filePath) {
              return res.status(500).json({ message: 'File path is missing or undefined' });
            }

            const fullFilePath = path.join(uploadDir, path.basename(filePath));

            // Rename the file to move it from temp directory to the desired directory
            fs.rename(file.filepath, fullFilePath, async (err) => {
                if (err) {
                    return res.status(500).json({ msg: 'Error saving the file', error: err.message });
                }

                const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
                const event_type = Array.isArray(fields.event_type) ? fields.event_type[0] as EventType : fields.event_type;
                const event_date = Array.isArray(fields.event_date) ? fields.event_date[0] : fields.event_date;
                const location = Array.isArray(fields.location) ? fields.location[0] : fields.location;
                const venue = Array.isArray(fields.venue) ? fields.venue[0] : fields.venue;
                const category = Array.isArray(fields.category) ? fields.category[0] as Category : fields.category;
                const event_description = Array.isArray(fields.event_description) ? fields.event_description[0] : fields.event_description;
                const ticket_start_date = Array.isArray(fields.ticket_start_date) ? fields.ticket_start_date[0] : fields.ticket_start_date;
                const ticket_end_date = Array.isArray(fields.ticket_end_date) ? fields.ticket_end_date[0] as EventType : fields.ticket_end_date;
                const created_date = new Date();
                const modified_date = new Date;
                const image = file.newFilename;

                const createdEvent = await prisma.events.create({
                    data: {
                        name: name as string,
                        event_date: new Date(event_date as string),
                        location: location as string,
                        venue: venue as string,
                        category: category as Category,
                        event_type: event_type as EventType,
                        event_description: event_description as string,
                        ticket_start_date: new Date(ticket_start_date as string),
                        ticket_end_date: new Date(ticket_end_date as string),
                        created_date: created_date,
                        modified_date: modified_date,
                        image: image
                    }
                })

                if (!createdEvent) {
                    return res.status(500).json({ msg: 'Error saving the Event' });
                }

                const tierFromReq = (Array.isArray(fields.tiers) ? fields.tiers[0] : fields.tiers) as string;
                const tierData = JSON.parse(tierFromReq);

                let tiers: any[] = []

                tierData.forEach((data: any) => {
                    let newData = {
                        event_id: createdEvent.id,
                        tier_name: data.tier_name as TierName,
                        price: Number(data.price),
                        max_capacity: Number(data.max_capacity)
                    }
                    tiers.push(newData);
                })

                const createdTiers = await prisma.eventsPrice.createMany({
                    data: tiers
                })

                if (!createdTiers) {
                    await prisma.events.delete({
                        where: {
                            id: createdEvent.id
                        }
                    })

                    return res.status(500).json({ msg: 'Error saving the Pricing' });
                }

                res.status(200).send({
                    status: 'ok',
                    msg: 'Event created successfully!',
                });
            });
        })
    }

    async editEvent(req: Request, res: Response) {
            try {
                // Extract the event ID from the request parameters
                const { id } = req.params;

                // Extract the fields to update from the request body
                const { name, event_date, location, venue, category, event_type, event_description, image, ticket_start_date, ticket_end_date, created_date, modified_date } = req.body

            // Ensure the ID is provided
            if(!id) {
                    return res.status(400).send({
                        status: 'error',
                        msg: 'Event ID is required',
                    });
                }

            // Attempt to update the event
            const updatedEvent = await prisma.events.update({
                    where: { id: Number(id) }, // Assuming 'id' is a number
                    data: { name, event_date, location, venue, category, event_type, event_description, image, ticket_start_date, ticket_end_date, created_date, modified_date },
                });

                // If the event was not found, respond with an error
                if(!updatedEvent) {
                    return res.status(404).send({
                        status: 'error',
                        msg: 'Event not found',
                    });
                }

            // Send a successful response
            res.status(200).send({
                    status: 'ok',
                    msg: 'Event updated successfully!',
                    updatedEvent
                });
            } catch(err) {
                // Handle any errors that occurred
                res.status(500).send({
                    status: 'error',
                    msg: 'An error occurred while updating the event',
                });
            }
        }

    async getEventsPaginated(req: Request, res: Response) {
            try {
                const page = Number(req.query.page);
                const size = Number(req.query.size);
                const query = req.query.query == "" ? undefined : req.query.query as string;
                const category = req.query.category == "" ? undefined : req.query.category as Category;
                const location = req.query.location == "" ? undefined : req.query.location as string;

                console.log(`${JSON.stringify(req.query)}`);

                const skip = (page) * size;
                const take = size;
                const totalCount = await prisma.events.count({
                    where: {
                        name: {
                            contains: query
                        },
                        category: category,
                        location: location
                    }
                });
                const paginatedData = await prisma.events.findMany({
                    where: {
                        name: {
                            contains: query
                        },
                        category: category,
                        location: location
                    },
                    orderBy: {
                        event_date: 'asc',
                    },
                    skip: skip,
                    take: take
                })

            res.status(200).send({
                    totalCount: totalCount,
                    data: paginatedData,
                    currentPage: page,
                    pageSize: size,
                })
            } catch(err) {
                res.status(400).send({
                    status: 'error',
                    msg: err
                })
            }
        }

    async getLocations(req: Request, res: Response) {
            const category = req.query.category == "" ? undefined : req.query.category as Category;

            try {
                const locations = await prisma.events.findMany({
                    where: {
                        category: category
                    },
                    distinct: ['location'],
                    select: {
                        location: true,
                    },
                });
                res.status(200).send({
                    status: 'ok',
                    locations
                })
            } catch(err) {
                res.status(400).send({
                    status: 'error',
                    msg: err
                })
            }
        }


    async getEvents(req: Request, res: Response) {
            try {
                const events = await prisma.events.findMany({
                    orderBy: { created_date: 'desc' }
                })
            res.status(200).send({
                    status: 'ok',
                    events
                })
            } catch(err) {
                res.status(400).send({
                    status: 'error',
                    msg: err
                })
            }
        }

    async getEventById(req: Request, res: Response) {
            try {
                const event = await prisma.events.findUnique({
                    where: { id: Number(req.params.id) }
                })
            res.status(200).send({
                    status: 'ok',
                    event
                })
            } catch(err) {
                res.status(400).send({
                    status: 'error',
                    msg: err
                })
            }
        }

    async getEventTiers(req: Request, res: Response) {
            try {
                const tiers = await prisma.$queryRaw`
            SELECT 
                a.id, 
                a.tier_name, 
                a.max_capacity, 
                a.price, 
                (a.max_capacity - IFNULL(SUM(b.quantity), 0)) AS remaining_capacity
            FROM ms_events_price a
            LEFT JOIN tx_transaction_details b ON a.event_id = b.event_id AND a.id = b.tier_id
            WHERE a.event_id = ${req.params.eventId}
            GROUP BY a.id, a.tier_name, a.max_capacity, a.price;`
            res.status(200).send({
                    status: 'ok',
                    tiers
                })
            } catch(err) {
                res.status(400).send({
                    status: 'error',
                    msg: err
                })
            }
        }



    async eventCheckout(req: Request, res: Response) {
            try {
                // Receiving data from the API request
                const { userId, eventId, promoCode, pointsUsed, paymentMethod, tickets } = req.body;

                // Validate the userId into database. User should exist, otherwise, we can not verify the ownership of the ticket
                // First, get the user from DB using the userId from API
                const userFromDB = await prisma.users.findUnique({
                    where: { id: Number(userId) }
                })

            // Next, check if the userFromDB doesn't exist. If it doesn't, return error
            if(!userFromDB) {
                    res.status(400).send({
                        status: 'error',
                        msg: 'Unable to find user!'
                    });
                }

            // Validate the event from the request. The event should exist.
            const eventFromDB = await prisma.events.findUnique({
                    where: { id: Number(eventId) }
                })

            // Next, check if the eventFromDB doesn't exist. If it doesn't, return error
            if(!eventFromDB) {
                    res.status(400).send({
                        status: 'error',
                        msg: `Event doesn't exist!`
                    });
                }

            let totalPrice = 0;
                // Check if event is free or paid. If paid, calculate the price
                if(eventFromDB && eventFromDB.event_type.toLowerCase() === 'paid') {
            // Get the tier prices for event
            const tiers: any = await prisma.$queryRaw`
                                    SELECT 
                                        a.id, 
                                        a.tier_name, 
                                        a.max_capacity, 
                                        a.price, 
                                        (a.max_capacity - IFNULL(SUM(b.quantity), 0)) AS remaining_capacity
                                    FROM ms_events_price a
                                    LEFT JOIN tx_transaction_details b ON a.event_id = b.event_id AND a.id = b.tier_id
                                    WHERE a.event_id = ${eventId}
                                    GROUP BY a.id, a.tier_name, a.max_capacity, a.price;`;

            // Compare the tickets bought with the prices, then calculate the totalPrice
            tickets.forEach((ticket: any) => {
                const tierId = ticket.tierId;

                const matchingTier = tiers.find((tier: any) => {
                    return tier.id == tierId
                });
                if (matchingTier) {
                    totalPrice += matchingTier.price * ticket.quantity;
                }
            })
        }

        // Compose the tx_transaction object to be inserted
        const newTransaction: any = {
            event_id: eventId,
            user_id: userId,
            promo_code: promoCode,
            points_used: pointsUsed,
            original_price: totalPrice,
            discounted_price: totalPrice, // Need to be adjusted to calculate the promo
            payment_status: 'paid',
            payment_date: new Date()
        }
        // Insert the transaction object into DB
        const createdTransaction = await prisma.transactions.create({
            data: newTransaction
        })

        // Check if transaction created successfully
        if (createdTransaction.id) {
            let transactionDetails: any = [];

            tickets.forEach((ticket: any) => {
                const tempDetail = {
                    transaction_id: createdTransaction.id, // Insert the newly created transaction id into transaction details table
                    event_id: eventId,
                    tier_id: ticket.tierId,
                    quantity: ticket.quantity
                }

                transactionDetails.push(tempDetail);
            })

            // Check if the data exist
            if (transactionDetails.length > 0) {
                // Insert the data into tx_transaction_details
                await prisma.transactionDetails.createMany({
                    data: transactionDetails
                })
            }
        } else {
            res.status(500).send({
                status: 'error',
                msg: 'There is something wrong. Please try again later!'
            });
        }

        res.status(200).send({
            status: 'success'
        });
    } catch(err) {
        console.error('Payment processing error:', err);
        res.status(500).send({
            status: 'error',
            msg: 'Payment processing failed'
        });
    }
}


    async deleteEvent(req: Request, res: Response) {
    try {
        const { id } = req.params;

        // Ensure the ID is provided
        if (!id) {
            return res.status(400).send({
                status: 'error',
                msg: 'Event ID is required',
            });
        }
        // Attempt to delete the event
        const event = await prisma.events.delete({
            where: { id: Number(id) }, // Assuming 'id' is a number
        });

        // If the event was not found, respond with an error
        if (!event) {
            return res.status(404).send({
                status: 'error',
                msg: 'Event not found',
            });
        }

        // Send a successful response
        res.status(200).send({
            status: 'ok',
            msg: 'Event deleted successfully!',
            event,
        });
    } catch (err) {
        // Handle any errors that occurred
        res.status(500).send({
            status: 'error',
            msg: 'An error occurred while deleting the event',
        });
    }
}
}


