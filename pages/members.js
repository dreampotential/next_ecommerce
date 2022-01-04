import { connectToDatabase } from "../util/mongodb";
import Link from 'next/link'
import { Button, Card, Grid } from 'semantic-ui-react'

export default function members({ members }) {
    const remove = async event => {
        console.log(event);
    }
    return (
        <>
        <h1 className = "my-10 text-center">Our Customers</h1>
            <Grid centered>
            <Card.Group itemsPerRow = {2}>
                {members.map((member, index) => (
                    <Card key={index}>
                        <Link href = {`/users/${member.name}`} >
                            <Button>{member.name}</Button>                      
                        </Link>
                        <div className = "actions">
                            <Button inverted color='red'><a href = {`/removeuser/${member.name}`}>Remove</a></Button>
                            <Button inverted color='blue'><a href = {`/edit/${member.name}`}>Edit</a></Button>
                        </div>
                    </Card>
                    
                ))}
            </Card.Group>
        </Grid>
        </>
    );
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const members = await db
        .collection("userlists")
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();

    return {
        props: {
            members: JSON.parse(JSON.stringify(members)),
        },
    };
}