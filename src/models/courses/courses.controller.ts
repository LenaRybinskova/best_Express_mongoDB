import { Request, Response } from 'express';
import {CoursesService} from './courses.service';

export class CoursesController {
    constructor(private coursesService: CoursesService ) {
    }
    getCourses = async (req: Request, res: Response) => {
        const result = await this.coursesService.getAllCourses()
        res.json({result})
    }

    getCourseById = async (req: Request, res: Response) => {
        res.json({})
    }

    update = async (req: Request, res: Response) => {
        res.json({})
    }

    create = async (req: Request, res: Response) => {
        res.json({})
    }

    delete = async (req: Request, res: Response) => {
        res.json({})
    }
}