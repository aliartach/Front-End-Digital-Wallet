import React, { useEffect, useState } from 'react';
import "../MerchantTabel/MerchantTabel.css";
import { useUser } from '../../../Context/useUser';
import axios from 'axios';

const MerchantTable = () => {
  const [orderClass, setOrderClass] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [data, setData] = useState([]);
  const { user, setUser } = useUser();

  useEffect(() => {
    const sortTable = (e) => {
      e.preventDefault();
      const target = e.target;
      const newSortBy = target.id;
      let newOrderClass = '';

      if (sortBy === newSortBy) {
        newOrderClass = orderClass === 'desc' ? 'asc' : 'desc';
      } else {
        newOrderClass = 'asc';
      }

      const table = document.querySelector('.table-content');
      const rows = Array.from(table.children);

      rows.sort((a, b) => {
        const x = a.children[newSortBy].textContent;
        const y = b.children[newSortBy].textContent;

        if (target.classList.contains('filter__link--number')) {
          if (newOrderClass === 'asc') {
            return x - y;
          } else {
            return y - x;
          }
        } else {
          if (newOrderClass === 'asc') {
            return x.localeCompare(y);
          } else {
            return y.localeCompare(x);
          }
        }
      });

      rows.forEach((row) => {
        table.appendChild(row);
      });

      setSortBy(newSortBy);
      setOrderClass(newOrderClass);
    };

    const headerLinks = document.querySelectorAll('.filter__link');
    headerLinks.forEach((link) => {
      link.addEventListener('click', sortTable);
    });

    return () => {
      headerLinks.forEach((link) => {
        link.removeEventListener('click', sortTable);
      });
    };
  }, [orderClass, sortBy]);


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.id) {
          const response = await axios.get(
            `http://localhost:4000/api/users/${user.id}`
          );
          console.log(response.data); // Log the response data
          setData(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchData();
  }, [user]);
  

  return (
    <div className="container">
      <div className="table">
        <div className="table-header">
          <div className="header__item">
            <a id="name" className="filter__link" href="#">
              Merchant Email
            </a>
          </div>
          <div className="header__item">
            <a id="wins" className="filter__link filter__link--number" href="#">
              Promo-Code
            </a>
          </div>
          <div className="header__item">
            <a id="draws" className="filter__link filter__link--number" href="#">
              Percentage
            </a>
          </div>
        </div>
        <div className="table-content">
          {data.map((item) => (
            <div className="table-row" key={item.id}>
              <div className="table-data">{item.email}</div>
              <div className="table-data">{item.promotions.promoCode}</div>
              <div className="table-data">{item.promotions.percentage}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchantTable;