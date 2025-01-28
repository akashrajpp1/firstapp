"use client"
import Image from "next/image";
import "./page.css";
import { db } from "@/lib/firebase/config";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import useAuth from "./_hooks/useAuth";
import Loading from "./loading";

export default function Home() {

  const { user, loading } = useAuth();

  let [queryStatus, setQueryStatus] = useState({});

  const fetchData = async () => {
    try {
      let colRef = collection(db, "queries");

      let totalQuerySnapshot = await getDocs(colRef);
      let paidApprovalsQuery = query(colRef, where("status", "==", "Paid Approval"));
      let totalPaidApprovalQueries = await getDocs(paidApprovalsQuery);

      let paidInsuranceQueries = query(colRef, where("status", "==", "Paid Insurance"));
      let totalPaidInsuranceSnapshot = await getDocs(paidInsuranceQueries);

      let totalPaidNocQuery = query(colRef, where("status", "==", "Paid NOC"));
      let totalPaidSnapshot = await getDocs(totalPaidNocQuery);

      let totalPaidHoldingQuery = query(colRef, where("status", "==", "Paid Holding"));
      let totalPaidHoldingSnapshot = await getDocs(totalPaidHoldingQuery);

      let totalNewleadsQuery = query(colRef, where("status", "==", "New Lead"));
      let newLeadSnapshot = await getDocs(totalNewleadsQuery);

      let totalCount = totalQuerySnapshot.size;
      let paidApprovalSize = totalPaidApprovalQueries.size;
      let paidInsuranceSize = totalPaidInsuranceSnapshot.size;
      let paidNOCSize = totalPaidSnapshot.size;
      let holdingSize = totalPaidHoldingSnapshot.size;
      let newLeadSize = newLeadSnapshot.size;

      setQueryStatus({ totalQueries: totalCount, paidApprovals: paidApprovalSize, paidInsurance: paidInsuranceSize, paidNOC: paidNOCSize, paidHolding: holdingSize, newLeads: newLeadSize });

    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    if (typeof window !== "undefined") {
      document.getElementById("navbar").style.display = "block";
      document.getElementById("mobileNavbar").style.display = "block";
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />
  }



  return (
    <>
      {user && <section style={{ padding: 0 }} className="wptb-video-wrapper-">
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 40 }} className="header_title" >
          <h2>Today's Insights</h2>
          <p>Check today's business status!</p>
        </div>
        <div className="container" bis_skin_checked={1} >
          <div className="overview_dashboard">
            <div className="all_Users_sec" >
              <h1 style={{ color: "rgb(4, 106, 33)" }} >All Users</h1>
              <div className="card_container"  >
                <div className="users_card" >
                  <div className="user_box" >
                    <h4 className="user_name" >Sonu</h4>
                    <i className="fa-solid fa-receipt"></i>
                  </div>
                  <div className="user_details" >
                    <h3>700</h3> <p>Query</p>
                  </div>
                </div>
                <div className="users_card" >
                  <div className="user_box" >
                    <h4 className="user_name" >Sonu</h4>
                    <i className="fa-solid fa-receipt"></i>
                  </div>
                  <div className="user_details" >
                    <h3>700</h3> <p>Query</p>
                  </div>
                </div>
                <div className="users_card" >
                  <div className="user_box" >
                    <h4 className="user_name" >Sonu</h4>
                    <i className="fa-solid fa-receipt"></i>
                  </div>
                  <div className="user_details" >
                    <h3>700</h3> <p>(Query)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="query_status" >
              <h1 style={{ color: "rgb(4, 106, 33)" }} >All Queries</h1>
              <div className="all_query_sec" >
                <div className="card_container" >
                  <div className="users_card" >
                    <div className="user_box" >
                      <h4 className="user_name" >Total Query</h4>
                      <i className="fa-solid fa-receipt"></i>
                    </div>
                    <div className="user_details" >
                      <h3>{queryStatus.totalQueries || 0}</h3> <p>(Query)</p>
                    </div>

                  </div>
                  <div className="users_card" >
                    <div className="user_box" >
                      <h4 className="user_name" >Paid Approvals</h4>
                      <i className="fa-solid fa-receipt"></i>
                    </div>
                    <div className="user_details" >
                      <h3>{queryStatus.paidApprovals || 0}</h3> <p>(Query)</p>
                    </div>
                  </div>

                  <div className="users_card" >
                    <div className="user_box" >
                      <h4 className="user_name" >Paid Insurance</h4>
                      <i className="fa-solid fa-receipt"></i>
                    </div>
                    <div className="user_details" >
                      <h3>{queryStatus.paidInsurance || 0}</h3> <p>(Query)</p>
                    </div>
                  </div>
                  <div className="users_card" >
                    <div className="user_box" >
                      <h4 className="user_name" >Paid Hold Charge</h4>
                      <i className="fa-solid fa-receipt"></i>
                    </div>
                    <div className="user_details" >
                      <h3>{queryStatus.paidHolding || 0}</h3> <p>(Query)</p>
                    </div>

                  </div>
                  <div className="users_card" >
                    <div className="user_box" >
                      <h4 className="user_name" >Paid NOC</h4>
                      <i className="fa-solid fa-receipt"></i>
                    </div>
                    <div className="user_details" >
                      <h3>{queryStatus.paidNOC || 0}</h3> <p>(Query)</p>
                    </div>
                  </div>
                  <div className="users_card" >
                    <div className="user_box" >
                      <h4 className="user_name" >New Leads </h4>
                      <i className="fa-solid fa-receipt"></i>
                    </div>
                    <div className="user_details" >
                      <h3>{queryStatus.newLeadSize || 0}</h3> <p>(Query)</p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >}
    </>
  );
}
