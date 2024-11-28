
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
    res.status(200).send('Server is Running');
})

server.get("/hotels", (req, res) => {
    res.status(200).json({
        success: true,
        data: HOTELS,
        message: "Hotel Data Fetch"
    });
})

server.post("https://hotelappfui.onrender.com/hotels", (req, res) => {
    const { roomNo, type, status, facility, descripation, days } = req.body;

    const HotelNo = HOTELS.find((Hotel) => {
        if (Hotel.roomNo === roomNo) {
            return Hotel;
        }
    })

    const objTemp={
        roomNo,
        type,
        status,
        facility,
        descripation,
        days
    }

    if(HotelNo) {
        return res.status(200).json({
            success: false,
            message: "Same Room Number Is Present"
        })
    }

    HOTELS.push(objTemp);

    res.status(201).json({
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

    res.status(200).json({
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
        return res.status(404).json({
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

server.put("/hotels/:roomNo",(req,res)=>{
    const{roomNo} = req.params;
    // console.log(roomNo)
    const{type,descripation,facility,days,status} = req.body;

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

    const hotel = {
        roomNo,
        type,
        descripation,
        facility,
        days,
        status
    }
   
    HOTELS[HotelCount] = hotel;

    res.json({
        success:true,
        data:hotel,
        message:"Data Update"
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