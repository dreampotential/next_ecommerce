import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {Button, Card, Image, Header} from 'semantic-ui-react'
import {client} from '../util/shopify'

export default function Home({products}) {

  return (
    <div className="products">
      <Head>
        <title>All Products</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Card.Group itemsPerRow = {6}>
      {products.map((product, index) => (
        <Link href = {`/product/${product.id}`} key = {index}>
          <Card>
            <Image src = {product.images[0].src} />
            <Card.Content>
              <Header as = "h2">{product.title}</Header>
              <p>{product.description}</p>
            </Card.Content>
          </Card>
        </Link>
      ))}
      </Card.Group>
    </div>
  )
}

export async function getServerSideProps(){
  const products = await client.product.fetchAll();
  return {props:{products: JSON.parse(JSON.stringify(products))}}
}