import Link from "next/link";

export default function Hero(){
    return(
<div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Festiva</h1>
      <p className="mb-5 text-md">
        Feel the Beat, Live the Moment!
      </p>
      <button className="btn"><Link href={"/search"}>Search your next event</Link></button>
    </div>
  </div>
</div>
    )
}
