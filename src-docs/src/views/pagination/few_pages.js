import React, { useState } from 'react';

import { WuiPagination } from '../../../../src/components';

export default function() {
  const [activePage, setActivePage] = useState(0);
  const PAGE_COUNT = 4;

  const goToPage = pageNumber => {
    setActivePage(pageNumber);
  };

  return (
    <WuiPagination
      aria-label="Few pages example"
      pageCount={PAGE_COUNT}
      activePage={activePage}
      onPageClick={activePage => goToPage(activePage)}
    />
  );
}
