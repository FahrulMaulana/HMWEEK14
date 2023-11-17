import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const Books = ({ books }) => {
  return (
    <>
      <Navbar />
      <div className="xs:mx-5 sm:mx-10 md:mx-20 lg:mx-30">
        <div className="flex flex-col mt-10">
          <p className="text-3xl text-center font-bold text-black mb-6 pb-6 border-b-4 border-[#2C3E50] w-48 mx-auto">
            Book List
          </p>
          <div className="flex flex-wrap justify-center justify-items-center items-start mx-8 mb-16">
            {books.map((book) => {
              return (
                <div
                  key={book.id}
                  className="max-w-sm w-1/3 m-4 md:w-full self-stretch bg-white rounded-lg border border-gray-200 shadow-md relative"
                >
                  <Image
                    src={`/uploads/${book.image}`}
                    alt="Book Image"
                    className="h-60 w-full object-cover object-center rounded"
                    width={500}
                    height={500}
                  />
                  <div className="p-5">
                    <h5 className="text-lg font-bold tracking-tight text-[#082032]">
                      {book.title}
                    </h5>
                    <p className="mb-14 text-sm text-[#FF4C29]">
                      {book.author}
                    </p>
                    <Link href={`/books/${book.id}`}>
                      <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 absolute bottom-5 left-5">
                        Read more
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;

export const getServerSideProps = async () => {
  const data = await prisma.book.findMany();
  return {
    props: {
      books: data,
    },
  };
};
