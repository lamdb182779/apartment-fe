
import NewBill from "./new";

export default async function Home({ searchParams }: { searchParams?: { number: number } }) {
    return (
        <NewBill number={searchParams?.number} />
    )
}