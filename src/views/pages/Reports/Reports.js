import React from "react";
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'
import UserReport from "./UserReport";
import CorporateReport from "./CorporateReport";
import DiscountReport from "./DiscountReport";
import PasswordReport from "./PasswordReport";
import BadgeReport from "./BadgeReport";
import ProfileReport from "./ProfileReport";
const tabsData = [{
  id: 1,
  itemKey: "home",
  itemName: "user",
  component: <UserReport />
 },
{
  id: 2,
  itemKey: "corporate",
  itemName: "Corp reg",
  component: <CorporateReport />
},
{
  id: 3,
  itemKey: "discount",
  itemName: "Discount coupan ",
  component: <DiscountReport />
},
{
  id: 4,
  itemKey: "change_pass",
  itemName: "Change Password",
  component: <PasswordReport />
},
{
  id: 5,
  itemKey: "badge",
  itemName: "Badge Issue",
  component: <BadgeReport />
},
{
  id: 7,
  itemKey: "profile",
  itemName: "Profile",
  component: <ProfileReport />
},
{
  id: 8,
  itemKey: "notifications",
  itemName: "Notifications",
  component: <PasswordReport />
},
]

const Tableview = () => {
  return (
    <>
      <CTabs activeItemKey="home">
        <CTabList variant="tabs">
          {
            tabsData && tabsData?.map((item) => <CTab itemKey={item.itemKey}>{item.itemName}</CTab>)
          }
        </CTabList>
        <CTabContent>
          {
            tabsData && tabsData?.map((item) => <CTabPanel className="p-3" itemKey={item.itemKey}>{item.component}</CTabPanel>)
          }
        </CTabContent>
      </CTabs>

    </>
  );
};

export default Tableview;
