import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProductsGrid from "./_component/ProductsGrid";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.expires && !session?.user) {
    return redirect("/login");
  }

  return (
    <main>
      <ProductsGrid />
    </main>
  );
}
