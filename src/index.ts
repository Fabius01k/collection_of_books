import app from "./app";
import {connectToDatabase} from "./infrastructure/db/db";

const PORT = process.env.PORT || 3000;

const startApp = async () => {
    await connectToDatabase();
    app.set('trust proxy', true)
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startApp();