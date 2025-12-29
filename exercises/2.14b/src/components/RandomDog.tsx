import { useEffect, useState } from "react";

interface Dog {
    message: string;
    status: string;
}

const RandomDog = () => {
    const [dog, setDog] = useState<Dog | undefined>(undefined);
    const [isHovered, setIsHovered] = useState(false);
    
    const fetchDogImage = async () => {
        try {
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            if (!response.ok) throw new Error(`fetch error: ${response.status}`);
            const data = await response.json();
            setDog({
                message: data.message ?? "No dog found",
                status: data.status ?? "Error",
            });
        } catch (error) {
            console.error("Failed to fetch dog image", error);
            setDog({message: "Failed to fetch dog image", status: "Error"});
        }
    };

    useEffect(() => {
        fetchDogImage();

        const interval = setInterval(() => {
            if(!isHovered){
                fetchDogImage();
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [isHovered])

    if(!dog){
        return <p>Loading...</p>
    }

    return (
        <div>
            <h3>Random dog</h3>
            <img 
            src={dog.message} alt="Random dog" 
            style={{ maxHeight: 300 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            />
        </div>
    );
};

export default RandomDog;