import { Request, Response } from "express";
import { createEvent, deleteEvent, editEvent, eventCheckout, getEventById, getEventBySlug, getEventsPaginated, getEventTiers, getLocations } from "@/services/event.service";

export class EventController {
    [x: string]: any;
    async createEvent(req: Request, res: Response) {
        return createEvent(req, res);
    }

    async editEvent(req: Request, res: Response) {
        return editEvent(req, res);
    }

    async getEventsPaginated(req: Request, res: Response) {
        return getEventsPaginated(req, res);
    }

    async getLocations(req: Request, res: Response) {
        return getLocations(req, res);
    }

    async getEventById(req: Request, res: Response) {
        return getEventById(req, res);
    }

    async getEventBySlug(req: Request, res: Response) {
        return getEventBySlug(req, res);
    }

    async getEventTiers(req: Request, res: Response) {
        return getEventTiers(req, res);
    }

    async eventCheckout(req: Request, res: Response) {
        return eventCheckout(req, res);
    }

    async deleteEvent(req: Request, res: Response) {
        return deleteEvent(req, res);
    }
}


