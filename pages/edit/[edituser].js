import { useState } from 'react'
import { connectToDatabase } from '../../util/mongodb'
import { Grid } from 'semantic-ui-react'
const User = ({ movies }) => {
    const [name, setName] = useState(movies.name);
    const [email, setEmail] = useState(movies.email);

    const onChangeName = (e) => {
        setName(e.target.value);
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const registerUser = async event => {
        event.preventDefault();
        console.log(name);
        console.log(email);
    }
    return (
        <Grid centered>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={registerUser}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rname">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" autoComplete="name" onChange={onChangeName} defaultValue={name} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Useremail
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="text" autoComplete="email" onChange={onChangeEmail} defaultValue={email} required />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Update
                </button>
            </form>
        </Grid>
    )

}

export async function getServerSideProps({ query }) {
    const { db } = await connectToDatabase();
    const edituser = query.edituser;
    const movies = await db
        .collection("userlists")
        .findOne({ name: edituser });
    return { props: { movies: JSON.parse(JSON.stringify(movies)) } }
}

export default User