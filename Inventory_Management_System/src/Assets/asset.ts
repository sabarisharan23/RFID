import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getAssetList = async (req: Request, res: Response) => {
 
  try {
    const getAssetList = await prisma.asset.findMany();
    res.status(200).json({Message:"All the assets has been listed", getAssetList})
  } catch (error) {
    console.error("Error getting all assets", error);
    res.status(500).json({ Error: "Error getting all assets", error });
  }
  }


  