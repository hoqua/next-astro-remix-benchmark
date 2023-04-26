import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  V2_MetaFunction,
} from "@remix-run/react";

import stylesheet from "./tailwind.css";
import { gql } from "~/data-access/graphq-client";
import { json } from "@remix-run/node";
import { DesktopMenu } from "~/components/menu/desktop-menu/desktop-menu";
import MobileMenu from "~/components/menu/mobile-menu/mobile-menu";
import { LocaleSwitcher } from "~/components/menu/locale-switcher";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader = async () => {
  const { productCategories } = await gql.GetProductCategories();
  return json({ productCategories });
};

export default function App() {
  const { productCategories } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>

      <body className="flex flex-col items-center">
        <div className="w-full max-w-screen-2xl pl-6 pr-6 md:pl-14 md:pr-14">
          <nav className="flex h-20 items-center justify-between md:h-28 lg:h-36">
            <Link to={`/`}>
              <img
                src={"/logo.svg"}
                width={85}
                height={15}
                alt={"logo"}
                className="md:h-5 md:w-28"
              />
            </Link>

            <div className="flex items-center gap-10">
              <DesktopMenu productCategories={productCategories} />

              <MobileMenu productCategories={productCategories} />

              <LocaleSwitcher locale={"en"} />
            </div>
          </nav>

          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

export const meta: V2_MetaFunction = () => {
  return [
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1",
    },
    { title: "Very cool app | Remix" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
};
