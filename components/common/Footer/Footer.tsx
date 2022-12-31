import { Facebook, Github, Linkedin, Mail, Twitter } from "@components/icons";
import Link from "next/link";
import React from "react";
import MainLogo from "../../../assets/logo.png";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="mt-40">
      <div className="grid grid-cols-6 border-t-4 border-blue-500 px-8 pt-12 lg:grid-cols-12 lg:px-36">
        <div className="col-span-1 hidden lg:col-span-2 lg:block">
          <img src={MainLogo.src} alt="main logo" className="w-32" />
        </div>
        <div className="col-span-3 lg:col-span-2">
          <ul>
            <li>
              <Link href={"/"}>Trang chủ</Link>
            </li>
            <li>
              <Link href={"/search"}>Sản phẩm</Link>
            </li>
            <li>Giới thiệu</li>
            <li>Liên hệ</li>
          </ul>
        </div>
        <div className="col-span-1 grid gap-3 lg:col-span-6">
          <Link
            href="https://www.facebook.com/profile.php?id=100024174710143"
            target="_blank"
            className="flex w-fit cursor-pointer gap-2"
          >
            <Facebook />
            <span className="hidden font-medium lg:inline">Facebook</span>
          </Link>
          <a
            href="https://twitter.com/wuemengg"
            target="_blank"
            className="flex w-fit cursor-pointer gap-2"
          >
            <Twitter />
            <span className="hidden font-medium lg:inline">Twitter</span>
          </a>
          <a
            href="https://www.linkedin.com/in/manh-nguyen-65807b236/"
            target="_blank"
            className="flex w-fit cursor-pointer gap-2"
          >
            <Linkedin />
            <span className="hidden font-medium lg:inline">Linkedin</span>
          </a>
          <a
            href="mailto:manh.n@outlook.com"
            className="flex w-fit cursor-pointer gap-2"
          >
            <Mail />
            <span className="hidden font-medium lg:inline">Mail</span>
          </a>
        </div>
        <div className="col-span-2 w-fit lg:col-span-2">
          <a
            target="_blank"
            href="https://github.com/manhnth"
            className="flex gap-2"
          >
            <Github />
            <span className="hidden font-medium lg:inline">Github</span>
          </a>
        </div>
        <style jsx>{`
          li {
            margin-bottom: 14px;
          }
        `}</style>
      </div>
      <div className="mt-5 flex justify-center border border-gray-200 pt-4 pb-6">
        &#169;{new Date().getFullYear()} manhnth, github. All rights reserved.
      </div>
    </div>
  );
};
