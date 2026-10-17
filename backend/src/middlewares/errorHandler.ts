import type { Request, Response, NextFunction } from "express";
import OpenAI from "openai";

export default function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error(err);

    if (err instanceof OpenAI.APIError) {
        if (err.status === 429) {
            res.status(503).json({
                message: "Servicio de IA temporalmente no disponible"
            });
            return;
        }

        res.status(502).json({
            message: "Error al comunicarse con el servicio de IA"
        });
        return;
    }

    res.status(500).json({
        message: "Error interno del servidor"
    });
}