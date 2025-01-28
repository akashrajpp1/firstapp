"use client"
import { useEffect, useState } from "react";
import "./profile.css";
import useAuth from "../_hooks/useAuth";
const ProfilePage = () => {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (user) {
            console.log(user, "User");
            setUserDetails(user);
        }
    }, [user]);

    return <>
        <section style={{ padding: 0, height: "60vh" }} className="wptb-video-wrapper-">
            <div style={{ display: "flex", flexDirection: "column", alignIems: "center", width: "100%", height: "100%", justifyContent: "center", paddingTop: 40 }}  >
                <div className="container" bis_skin_checked={1} >
                    <div className="profile_container" >
                        {userDetails && <div className="profile_details" >
                            <div className="profile-icon" >
                                <i className="fa-solid fa-user profileIcon"></i>
                            </div>
                            <div className="profile-info" >
                                <div className="row" >
                                    <div className="col" >
                                        <strong>Name</strong>
                                    </div>
                                    <div className="col" >
                                        <strong>Himanshu Raj Anand</strong>
                                    </div>
                                </div>
                                <div className="row" >
                                    <div className="col" >
                                        <strong>Email</strong>
                                    </div>
                                    <div className="col" >
                                        <strong>{userDetails.email}</strong>
                                    </div>
                                </div>
                                <div className="row" >
                                    <div className="col" >
                                        <strong>Password</strong>
                                    </div>
                                    <div className="col" >
                                        <strong>**********</strong>
                                        <p style={{ color: "red", fontSize: 11, margin: 0, padding: 0 }} >Change Password</p>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>

                </div>
            </div>

        </section >
    </>
}

export default ProfilePage;