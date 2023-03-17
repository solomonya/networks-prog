import { useState, useEffect } from "react";
import { ShowList } from "@/components";
import { prisma } from "@/prisma";
import { Epmloyee } from "@prisma/client";
import styles from './employees.module.css';
import { useDebounce } from "@/hooks/useDebounce";

interface Props {
  epmloyees: Epmloyee[];
}

export default function EmployeesPage({ epmloyees }: Props) {

  const [searchTerm, setSearchTerm] = useState("");
  // API search results
  const [results, setResults] = useState([]);
  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );


  
  return (
    <main>
      <section>
        <div className={styles.searchContainer}>
          <label>Поиск сотрудников</label>
          <input 
            type={'search'}         
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {
          isSearching ? <div>Loading...</div> : (
            <div className={styles.employeesContainer}>
              <ShowList list={debouncedSearchTerm.length > 0 ? results : epmloyees}>
                {
                  (emp) => {
                    return (
                      <div className={styles.employeeCard} key={emp.id}>
                        <h5>{emp.firstName} {emp.lastName}</h5>
                        <span>{emp.position}</span>
                      </div>
                    );
                  }
                }
              </ShowList>
            </div>
          )
        }
      </section>
    </main>
  );
};

function searchCharacters(search: string) {
  return fetch(
    `http://localhost:3000/api/employees/search/?emp=${search}`,
  )
    .then((r) => r.json())
    .then((data) => data.results)
    .catch((error) => {
      console.error(error);
      return [];
    });
}


export async function getStaticProps() {
  const epmloyees = await prisma.epmloyee.findMany();
  console.log(epmloyees);

  return {
    props: {
      epmloyees,
    },
  };
}