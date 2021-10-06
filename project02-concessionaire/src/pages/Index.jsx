import React from 'react'
import 'styles/index.css';

const Index = () => {
    return (
      <div>
        <div className="index-showcase h-screen bg-no-repeat bg-cover">
          <div className="w-full h-full flex justify-center items-center">
            <div className="block">
              <h2 className="text-4xl font-bold text-gray-100 m-2">
                One of the best vehicles manufacturing companies
              </h2>
              <h3 className="text-xl font-bold text-gray-100 m-2 mt-5">
                We offer services such as purchase, sale, repair, investigation
                among others
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Index
