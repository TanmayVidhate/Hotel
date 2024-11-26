
import express from 'express';
import cors from 'cors';
const server = express();

server.use(express.json());
server.use(cors());

const HOTELS = [
    {
        "roomNo": 101,
        "type": "hall",
        "descripation": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, perspiciatis.",
        "facility": "AC",
        "days": 2,
        "status": true
    },
    {
        "roomNo": 102,
        "type": "1BHK",
        "descripation": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, perspiciatis.",
        "facility": "Non AC",
        "days": 3,
        "status": false
    },
    {
        "roomNo": 103,
        "type": "1RK",
        "descripation": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, perspiciatis.",
        "facility": "AC",
        "days": 5,
        "status": true
    }
]

server.get("/health",(req, res) => {
    res.send('Server is Running');
})

server.get("/hotels", (req, res) => {
    res.json({
        success: true,
        data: HOTELS,
        message: "Hotel Data Fetch"
    });
})

server.post("https://hotelappfui.onrender.com/hotels", (req, res) => {
    const { roomNo, type, status, facility, descripation, days } = req.body;

    if (!roomNo) {
        return res.json({
            success: false,
            message: "Please Enter Room No"
        })
    }

    if (!type) {
        return res.json({
            success: false,
            message: "Please Enter type"
        })
    }

    if (!status) {
        return res.json({
            success: false,
            message: "Please Enter Status"
        })
    }

    if (!facility) {
        return res.json({
            success: false,
            message: "Please Enter facility"
        })
    }

    if (!descripation) {
        return res.json({
            success: false,
            message: "Please Enter descripation"
        })
    }

    if (!days) {
        return res.json({
            success: false,
            message: "Please Enter Remaining Days"
        })
    }

    const objTemp = {
        roomNo,
        type,
        status,
        facility,
        descripation,
        days
    }

    const HotelNo = HOTELS.find((Hotel) => {
        if (Hotel.roomNo === roomNo) {
            return Hotel;
        }
    })

    if(HotelNo) {
        return res.json({
            success: false,
            message: "Same Room Number Is Present"
        })
    }


    HOTELS.push(objTemp);

    res.json({
        success: true,
        message: "Data Add done"
    })

    
})

server.get("https://hotelappfui.onrender.com/hotels/:roomNo", (req, res) => {
    const { roomNo } = req.params;

    let HotelCount = -1;

    HOTELS.map((hotel, index) => {
        if (hotel.roomNo == roomNo) {
            HotelCount = index;
        }
    })

    if (HotelCount == -1) {
        return res.json({
            success: false,
            message: "Data Not Found"
        })
    }

    res.json({
        success: true,
        data: HOTELS[HotelCount],
        message: "Data Found "
    })
})

server.delete("https://hotelappfui.onrender.com/hotels/:roomNo", (req, res) => {
    const { roomNo } = req.params;

    let HotelCount = -1;

    HOTELS.map((hotel, index) => {
        if (hotel.roomNo == roomNo) {
            HotelCount = index;
        }
    })

    if (HotelCount == -1) {
        return res.json({
            success: false,
            message: "Data Not Found"
        })
    }

    HOTELS.splice(HotelCount, 1);

    res.json({
        success: true,
        message: "Data Deleted "
    })
})

server.get("*", (req, res) => {
    res.json(
        {
            "success": "false",
            "message": "Invalid Request"
        }
    )
})

const PORT = 5002;
server.listen(PORT, () => {
    console.log(`https://localhost:${PORT}`);
})