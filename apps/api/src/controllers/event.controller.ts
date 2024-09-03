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
}