import { Request, Response } from "express";
import prisma from "../prisma";

export class EventController {
    async createEvent(req: Request, res: Response){
        try {
            // if (!req.file) throw "no file uploaded"
            // const link = `http://localhost:8000/api/public/event/${req?.file?.filename}`

            const { name, event_date, location, venue, category, event_type, event_description, image, ticket_start_date, ticket_end_date, created_date, modified_date } = req.body

            const event = await prisma.events.create({
                data: {
                    name, event_date, location, venue, category, event_type, event_description, image, ticket_start_date, ticket_end_date, created_date, modified_date
                }
            })
            res.status(201).send({
                status: 'ok',
                msg: 'Event created!',
                event
            })
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }

    async editEvent(req: Request, res: Response) {
        try {
            // Extract the event ID from the request parameters
            const { id } = req.params;
            
            // Extract the fields to update from the request body
            const { name, event_date, location, venue, category, event_type, event_description, image, ticket_start_date, ticket_end_date, created_date, modified_date } = req.body
    
            // Ensure the ID is provided
            if (!id) {
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
            if (!updatedEvent) {
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
        } catch (err) {
            // Handle any errors that occurred
            res.status(500).send({
                status: 'error',
                msg: 'An error occurred while updating the event',
            });
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
        } catch (err) {
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
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }

    async deleteEvent(req: Request, res: Response) {
        try {const { id } = req.params;

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

