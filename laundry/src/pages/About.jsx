import React from "react";
import AdminLayout from "../components/adminlayout";

const About = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) return null; // optional redirect can be added if needed

  return (
    <AdminLayout user={loggedInUser}>
      <div className="card">
        <h2>About Laundry Inventory System</h2>
        <p>
          At Clean Wash Laundry Hub, we believe that clean clothes bring comfort, confidence, and convenience to everyday life. Our mission is to provide reliable, affordable, and high-quality laundry services that save our customers time and effort.
We are committed to delivering fresh, neatly folded, and perfectly cared-for garments using modern washing equipment and safe, fabric-friendly detergents. Whether it’s everyday wear, uniforms, bedding, or delicate fabrics, we treat every item with attention and care.
        </p>
      </div>
    </AdminLayout>
  );
};

export default About;