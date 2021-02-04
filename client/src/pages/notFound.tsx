import React from 'react';
import { H1 } from '../components/atoms/typography/typography';

const NotFound = () => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 center-xs">
            <H1>
              Page Not Found
            </H1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
