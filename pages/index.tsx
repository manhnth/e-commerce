import Link from "next/link";
import axios from "axios";
import { CATEGORIES } from "constants/data";
import Container from "@components/ui/Container";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { formatCurrency, truncateString } from "lib/utils";
import { ArrowEast } from "@components/icons/ArrowEast";
import { Address, Alarm, MailFill, Phone } from "@components/icons";

export async function getStaticProps(context: GetStaticPropsContext) {
  const res = await fetch(
    "https://farmacity-server-production.up.railway.app/products/search/?page=1&&perPage=6"
  );
  const newProducts = await res.json().then((res) => res.data);

  return {
    props: { newProducts },
    // revalidate: 4000,
  };
}

export default function Home({
  newProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // const { openModal, setModalView } = useUI();
  // const handleClick = () => {
  //   openModal();
  //   setModalView("LOGIN_VIEW");
  // };

  // const setProducts = () => {
  //   // products.map((p) =>
  //   //   setTimeout(() => axios.post("products/create", { ...p }), 3000)
  //   // );
  // };
  return (
    // <div>
    //   <button onClick={() => setProducts()}>create</button>
    // </div>
    <>
      {/* hero section */}
      <div
        className={`mb-32 hidden h-hero bg-[url(../assets/hero-img.jpg)] bg-cover bg-center lg:block`}
      >
        <div className="flex h-full w-full items-center justify-center bg-black bg-opacity-50 text-white">
          <div className="flex flex-col justify-center">
            <div className="flex justify-center pt-36 pb-3 text-4xl">
              Welcome to
            </div>
            <div className="flex justify-center pb-6 text-6xl">Farmacity</div>
            <div className="mb-3 flex justify-center pb-5 text-2xl text-sky-400">
              Chúng tôi cung cấp thiết bị y tế sử dụng trong gia đình
            </div>
            <Link
              href={`search`}
              className="mx-auto rounded-md bg-blue-500 px-3 py-2 text-xl hover:bg-blue-600"
            >
              Khám phá ngay
            </Link>
          </div>
        </div>
      </div>
      {/* categories section */}
      <Container>
        <div className="flex justify-center pb-6 text-lg font-bold">
          <span className="border-b-2 border-blue-500 pb-2">
            Danh mục sản phẩm
          </span>
        </div>
        <div className="grid grid-cols-2 justify-items-center pt-4 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c, i) => {
            return (
              <Link
                href={`search/${c.slug}`}
                key={i}
                className="w-32 cursor-pointer border border-transparent px-3 py-4 hover:rounded-sm hover:border  hover:border-sky-500 hover:bg-gray-100 hover:shadow-2xl"
              >
                <picture>
                  <span style={{ paddingTop: "100%" }}></span>
                  <img src={c.imgUrl} alt={c.name} className="" />
                </picture>
                <p>{c.name}</p>
              </Link>
            );
          })}
        </div>
      </Container>
      {/* new products section */}
      <Container>
        <div className="mt-28 flex justify-center pb-6 text-lg font-bold">
          <span className="border-b-2 border-blue-500 pb-2">Sản phẩm mới</span>
        </div>
        <div className="grid grid-cols-2 justify-items-center gap-2 pt-4 md:grid-cols-3 lg:grid-cols-6">
          {newProducts &&
            newProducts.map((p: any, i: any) => {
              return (
                <Link
                  href={`/product/${p.id}`}
                  key={i}
                  className="cursor-pointer"
                >
                  <div className="rounded-md bg-white p-2 pt-2 pb-8 shadow-md transition hover:shadow-xl">
                    <picture>
                      <img
                        src={p.imgUrl}
                        alt={p.name}
                        className="w-24 md:w-36"
                      />
                    </picture>
                    <p className="inline-block pt-2">
                      {truncateString(p.name, 20)}
                    </p>
                    <p className="block pb-6 text-green-500">
                      {formatCurrency(p.price)}
                    </p>

                    <div className="flex justify-between pr-2">
                      <span className="font-bold text-blue-500">
                        Xem chi tiết
                      </span>
                      <ArrowEast />
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </Container>
      {/* service section */}
      <div className="mt-48 hidden bg-gray-300 lg:mb-32 lg:block">
        <Container>
          <div className="grid translate-y-2/4 justify-between gap-2 lg:flex">
            <div className="w-72 rounded-lg bg-gray-400 p-10">
              <Address />
              <span className="font-bold">We are here</span>
              <p>Dong Da, Ha Noi, Viet Nam</p>
            </div>
            <div className="w-72 rounded-lg bg-gray-400 p-10 pb-24">
              <Phone />
              <span className="font-bold">Call us</span>
              <p>09633 09465</p>
            </div>
            <div className="w-72 rounded-lg bg-gray-400 p-10">
              <Alarm />
              <span className="font-bold">We are open on</span>
              <p>9AM - 6PM </p>
            </div>
            <div className="w-72 rounded-lg bg-gray-400 p-10">
              <MailFill />
              <span className="font-bold">Drop us an Email</span>
              <p>manh.n@outlook.com</p>
            </div>
          </div>
        </Container>
      </div>
      {/* contact section */}
      <Container>
        <div className="items-center justify-between py-24 lg:flex">
          <div>
            Nhập <strong>Email </strong>
            để nhận thông tin khuyến mãi từ Farmacity
          </div>
          <div className="py-3">
            <input
              type="text"
              placeholder="Email thường dùng"
              className="border-b-2 border-gray-300 p-1 text-gray-500 outline-none"
            />
          </div>
          <button className="ml-2 rounded-sm bg-blue-500 p-1 px-3 text-white hover:bg-blue-700">
            Đăng ký
          </button>
        </div>
      </Container>
    </>
  );
}
