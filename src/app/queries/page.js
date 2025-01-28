"use client"
import { useEffect, useState } from "react";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import "./query.css";
import QueryView from "../components/QueryView/page";
import QueryEdit from "../components/QueryEdit/page";
const QueryPage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [queryList, setQueryList] = useState([]);
    const [viewQuery, setViewQuery] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState({});
    const [selectedQueries, setSelectedQueries] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("none");

    const fetchData = async () => {
        console.log("Fetch function called")
        try {
            const colRef = collection(db, "queries");
            let q;
            if(sortBy === "none"){
                q = query(colRef, orderBy("createdAt", "desc"));
            }else if(sortBy === "asc"){
                q = query(colRef, orderBy("createdAt", "asc"));
            }else if(sortBy === "name"){
                q = query(colRef, orderBy("name", "desc"));
            }
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setQueryList(data);
            console.log(querySnapshot, "Query List")
        } catch (err) {
            console.log(err);
        }
    }

    const viewQueryTrigger = (e,item)=>{
        if(!e.target.className.includes("actionBtn") && !e.target.className.includes("selectCheckbox")){
            console.log(item, "View Query Triggered");
            setSelectedQuery(item);
            setViewQuery(true);
            document.getElementById("queryContainer").style.display = "flex";
        }else if(e.target.className.includes("actionBtn") && e.target.className.includes("edit")) {
            console.log("Clicked on edit", item);
            setSelectedQuery(item);
            setViewQuery(true);
            document.getElementById("queryEditPopup").style.display = "flex";
        }else if(e.target.className.includes("selectCheckbox")){
            let queryList = selectedQueries;
           if(!queryList.indexOf(item.id) && e.target.checked){
            queryList.push(item.id);
            setSelectedQueries(queryList);
           }else{

           }
        }
       
    };

    const searchData = async ()=>{
        console.log("Search Initiated with query", searchQuery);
        try{
            let colRef = collection(db, "queries");
            let q = query(colRef, where("fullname_lower", ">=", searchQuery.toLowerCase()), where("fullname_lower", "<=", searchQuery.toLowerCase() + "\uf8ff"))
            let querySnapshot = await getDocs(q);
            console.log(querySnapshot, "Query Snapshot upon query Search")
              // Map and return the results
            const results = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(results, "Results on Search");
            setQueryList(results);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        console.log("Search State Is Changing");
        searchData();
    },[searchQuery]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.innerWidth < 529 ? setIsMobile(true) : setIsMobile(false);
        };
        fetchData();
    }, [sortBy]);
    return <>
        <QueryView item={selectedQuery}  />
        <QueryEdit item={selectedQuery} />
        <section className="wptb-video-wrapper-">
            <div className="header_title" >
                <h2>All Queries</h2>
                <p>Check out all queries</p>
            </div>
            
            
            <div className="container" bis_skin_checked={1} >
            <div className="action_bar" >
                <div className="actions_container" >
                        <div className="left_sec" >
                            <label>Search</label> 
                            <input placeholder="search by name" onChange={(e)=> setSearchQuery(e.target.value)} type="text" />
                        </div>
                        <div className="right_sec" >
                                <div className="sort_container" >
                                    <label>Sort by</label>
                                    <select onChange={(e)=> setSortBy(e.target.value)} >
                                        <option value="none" >No Filter</option>
                                        <option value="asc" >By Date (Asc)</option>
                                        <option value="desc" >By Date (Des)</option>
                                        <option value="name" >By Name</option>
                                    </select>
                                </div>
                                <div>
                                <i style={{color: "red"}} className="fa-solid fa-ban"></i>
                                </div>
                        </div>
                        
                </div>
            </div>
            {/* <div className="action_bar" >
                <div className="actions_container" >
                        <div className="left_sec" >
                            <label>Send Email: </label> 
                            <label>Processing</label>
                            <label>NOC</label>
                            <label>Holding</label>
                            <label>Insurance</label>
                            <label>Invoice</label>
                        </div>
                        
                </div>
            </div> */}
                <div className="query_list" ><table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            {!isMobile && <th scope="col">Adhaar/PAN</th>}
                            {!isMobile && <th scope="col">Loan Details</th>}
                            <th scope="col">Status</th>
                            <th style={{width: 100}} scope="col">Update/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queryList && queryList.map(a => {
                            return <tr onClick={(e)=>viewQueryTrigger(e,a)} style={{cursor: "pointer"}} key={a.id}>
                                <th scope="row"> <div className="table-item" style={{display: "flex", flexDirection: "row"}} > <span> <input className="selectCheckbox" type="checkbox" /> </span> <strong style={{textWrap: "wrap"}} >{a.id}</strong> </div> </th>
                                <td> <div className="table-item" > <p>{a.name}</p> </div> </td>
                                {!isMobile && <td > <div className="table-item"   ><span>A-{a.adhaar}</span> <span>P-{a.PAN}</span></div> </td>}
                                {!isMobile && <td> <div className="table-item"><span>LT- {a.loantype}</span> <span>A-{a.loanamount}</span> <span>T-{a.tenure} Years</span> </div> </td>}
                                <td><div className="table-item"> <span>{a.status}</span> </div></td>
                                <td> <div className="table-item" style={{gap: "12px"}} ><span><i className="fa-solid fa-pen-to-square actionBtn edit"></i></span> <span><i className="fa-solid fa-trash actionBtn"></i></span> </div> </td>
                            </tr>
                        })}
                    </tbody>
                </table></div>
            </div>
        </section >
    </>
}

export default QueryPage;