// // src/router.ts
// import { Router } from 'express';
// import { initServer } from '@ts-rest/express';
// import contract  from '../contract/index'; // Ensure correct import path
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
// const s = initServer();

// const assetRouter = s.router(contract.asset, {
//     createAsset: async ({ body }) => {
//         const asset = await prisma.asset.create({
//             data: body,
//         });
//         return { status: 201, body: asset };
//     },
//     listAssets: async () => {
//         const assets = await prisma.asset.findMany();
//         return { status: 200, body: assets };
//     },
//     updateAsset: async ({ params, body }) => {
//         const { id } = params;
//         const asset = await prisma.asset.update({
//             where: { id: Number(id) },
//             data: body,
//         });
//         return { status: 200, body: asset };
//     },
//     deleteAsset: async ({ params }) => {
//         const { id } = params;
//         await prisma.asset.delete({
//             where: { id: Number(id) },
//         });
//         return { status: 204, body: {} };
//     },
// });

// const locationRouter = s.router(contract.location, {
//     createLocation: async ({ body }) => {
//         const location = await prisma.location.create({
//             data: body,
//         });
//         return { status: 201, body: location };
//     },
//     listLocations: async () => {
//         const locations = await prisma.location.findMany();
//         return { status: 200, body: locations };
//     },
// });

// const router = Router();
// router.use('/api', assetRouter);
// router.use('/api', locationRouter);

// export default router;
//from hari 