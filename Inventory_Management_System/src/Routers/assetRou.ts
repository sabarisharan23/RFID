import { Router } from "express";
import { getAssetList} from "../Assets/asset";

const router = Router();


router.get ("/", getAssetList)


export default router;