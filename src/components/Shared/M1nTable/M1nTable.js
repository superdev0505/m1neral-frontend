////////////////////////////////////////////////////////////////////////////////////////////////////////////
////                TO USE THIS TABLE:
//// 1-Send to this component a prop called 'parent' with a trackOwners/trackWells/Contacts/OwnersPerWell...
////  -if it is OwnersPerWell use case add another prop "selectedWell" with the well
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////                TO USE THIS TABLE IN A NEW USE CASE:
//// 1-Send to this component a prop called 'parent' with a string you choose to identify your use case.
//// 2-Define your HeadCells const, for your columns, in the HeadCells section.
//// 3-Add your query in the queries section.
//// 4-At the end, but before the return line, add your own section where you will run your queries
////   and you will set all necessaries local states for your use case and the table,
////   look at the Tracked Owners section as example.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////external table package info: https://github.com/gregnb/mui-datatables /////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../../../AppContext";
import { Container } from "@material-ui/core";
import Table from "./components/Table";

import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { WELLOWNERSQUERY } from "../../../graphQL/useQueryWellOwners";
import { OWNERSQUERY } from "../../../graphQL/useQueryOwners";
import { WELLSQUERY } from "../../../graphQL/useQueryWells";
import { CONTACTSQUERY } from "../../../graphQL/useQueryContacts";
import { TRACKSBYOBJECTTYPE } from "../../../graphQL/useQueryTracksByObjectType";
import { TAGSAMPLES } from "../../../graphQL/useQueryTagSamples";
import { COMMENTSCOUNTER } from "../../../graphQL/useQueryCommentsCounter";
import { CONTACSCOUNTER } from "../../../graphQL/useQueryContactsCounter";
import { CONTACTSBYOWNERSID } from "../../../graphQL/useQueryContactsByOwnerId";
import { OWNERSWELLSQUERY } from "../../../graphQL/useQueryOwnersWells";
import { ADDREMOVEOWNERTOACONTACT } from "../../../graphQL/useMutationAddRemoveOwnerToAContact";
import { CONTACT } from "../../../graphQL/useQueryContact";
import { CUSTOMLAYER } from "../../../graphQL/useQueryCustomLayer";
import { REMOVECONTACT } from "../../../graphQL/useMutationRemoveContact";
import { UPDATECONTACT } from "../../../graphQL/useMutationUpdateContact";
import { UPDATEPARCELOWNER } from "../../../graphQL/useMutationUpdateParcelOwner";

import { useDispatch, useSelector } from "react-redux";
import { deepEqualObjects, setStateIfDeepEqual } from "../functions";

const useStyles = makeStyles((theme) => ({
  container: { padding: "0 !important" },
}));

////////////HeadCells begin///////////////////////////////////////////////
const TrackedOwnersHeadCells = [
  {
    name: "id",
    options: {
      display: false,
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  { name: "name", label: "Name" },
  {
    name: "ownershipType",
    label: "Entity",
  },
  // { name: "interestType", label: "Type" },
  // {
  //   name: "ownershipPercentage",
  //   label: "Interest",
  // },

  // TEMPORARY COMMENT OUT. DO NOT DELETE
  // WILL BE ADDED IN AFTER DEVELOPING A SYSTEM TO
  // AGGREGATE OWNERS
  // {
  //   name: "appraisedValue",
  //   label: "Appraised Value",
  // },

  {
    name: "tags",
    label: "Tags ",
    options: {
      sort: false,
      download: false,
      print: false,
      filterOptions: {
        names: [],
        logic(rowVal, pickedTags) {
          let containIts = true;
          pickedTags.map((pickedTag) => {
            if (rowVal[0].indexOf(pickedTag) === -1) {
              containIts = false;
            }
          });
          return !containIts;
        },
      },
    },
  },
  {
    name: "contactsCounter",
    label: " ",
    options: {
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },

  /* 
  // TEMPORARY COMMENT OUT. DO NOT DELETE 
  // WILL BE RE-ADDED ONCE WE FIGURE OUT HOW TO DRAW AGGREGATIONS 
  // FOR UNIVERSAL OWNERS


  // {
  //   name: "wellsCounter",
  //   label: " ",
  //   options: {
  //     filter: false,
  //     searchable: false,
  //     sort: false,
  //     download: false,
  //     print: false,
  //     viewColumns: false,
  //   },
  // },
 */

  {
    name: "commentsCounter",
    label: " ",
    options: {
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  {
    name: "isTracked",
    label: " ",
    options: {
      filter: false,
      sort: false,
      searchable: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
];

const WellsHeadCells = [
  {
    name: "id",
    options: {
      display: false,
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  { name: "wellName", label: "Well" },
  { name: "api", label: "API" },
  { name: "operator", label: "Operator" },
  { name: "wellType", label: "Type" },
  {
    name: "wellBoreProfile",
    label: "Profile",
  },
  {
    name: "tags",
    label: "Tags ",
    options: {
      sort: false,
      download: false,
      print: false,
      filterOptions: {
        names: [],
        logic(rowVal, pickedTags) {
          let containIts = true;
          pickedTags.map((pickedTag) => {
            if (rowVal[0].indexOf(pickedTag) === -1) {
              containIts = false;
            }
          });
          return !containIts;
        },
      },
    },
  },
  {
    name: "ownerCount",
    label: " ",
    options: {
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  {
    name: "commentsCounter",
    label: " ",
    options: {
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  {
    name: "isTracked",
    label: " ",
    options: {
      filter: false,
      sort: false,
      searchable: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
];

const OwnersPerWellHeadCells = [
  {
    name: "id",
    options: {
      display: false,
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  { name: "name", label: "Name" },
  {
    name: "ownershipType",
    label: "Entity",
  },
  { name: "interestType", label: "Type" },
  {
    name: "ownershipPercentage",
    label: "Interest",
  },
  {
    name: "appraisedValue",
    label: "Appraised Value",
  },
  {
    name: "tags",
    label: "Tags ",
    options: {
      sort: false,
      download: false,
      print: false,
      filterOptions: {
        names: [],
        logic(rowVal, pickedTags) {
          let containIts = true;
          pickedTags.map((pickedTag) => {
            if (rowVal[0].indexOf(pickedTag) === -1) {
              containIts = false;
            }
          });
          return !containIts;
        },
      },
    },
  },
  {
    name: "contactsCounter",
    label: " ",
    options: {
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },

  /*   
// TEMPORARY COMMENT OUT. DO NOT DELETE 
  // WILL BE RE-ADDED ONCE WE HAVE A WAY OF AGGREGATING A 
  // UNIVERSAL OWNER 

  // {
  //   name: "wellsCounter",
  //   label: " ",
  //   options: {
  //     filter: false,
  //     searchable: false,
  //     sort: false,
  //     download: false,
  //     print: false,
  //     viewColumns: false,
  //   },
  // }, 
  */

  {
    name: "commentsCounter",
    label: " ",
    options: {
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  {
    name: "isTracked",
    label: "Track",
    options: {
      searchable: false,
      download: false,
      print: false,
      filterOptions: {
        names: ["Tracked", "Untracked"],
        logic(tracked, filterVal) {
          return !(
            (filterVal.indexOf("Tracked") >= 0 && tracked) ||
            (filterVal.indexOf("Untracked") >= 0 && !tracked)
          );
        },
      },
      filterType: "dropdown",
    },
  },
];

const OwnersPerContactsHeadCells = [
  {
    name: "id",
    options: {
      display: false,
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  { name: "name", label: "Name" },
  {
    name: "ownershipType",
    label: "Entity",
  },
  {
    name: "appraisedValue",
    label: "Appraised Value",
  },
  {
    name: "tags",
    label: "Tags ",
    options: {
      sort: false,
      download: false,
      print: false,
      filterOptions: {
        names: [],
        logic(rowVal, pickedTags) {
          let containIts = true;
          pickedTags.map((pickedTag) => {
            if (rowVal[0].indexOf(pickedTag) === -1) {
              containIts = false;
            }
          });
          return !containIts;
        },
      },
    },
  },
  {
    name: "contactsCounter",
    label: " ",
    options: {
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },

  /*   
  // TEMPORARY COMMENT OUT. DO NOT REMOVE 
  // WILL BE UNCOMMENTED ONCE WE UNDERSTAND A MORE 
  // UNIVERSAL OWNER ID. 

  // {
  //   name: "wellsCounter",
  //   label: " ",
  //   options: {
  //     filter: false,
  //     searchable: false,
  //     sort: false,
  //     download: false,
  //     print: false,
  //     viewColumns: false,
  //   },
  // },
 */

  {
    name: "commentsCounter",
    label: " ",
    options: {
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  {
    name: "isTracked",
    label: "Track",
    options: {
      searchable: false,
      download: false,
      print: false,
      filterOptions: {
        names: ["Tracked", "Untracked"],
        logic(tracked, filterVal) {
          return !(
            (filterVal.indexOf("Tracked") >= 0 && tracked) ||
            (filterVal.indexOf("Untracked") >= 0 && !tracked)
          );
        },
      },
      filterType: "dropdown",
    },
  },
];

const ContactsHeadCells = [
  {
    name: "_id",
    options: {
      display: false,
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  {
    name: "entity",
    options: {
      display: false,
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  {
    name: "address1",
    options: {
      display: false,
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  {
    name: "address2",
    options: {
      display: false,
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  {
    name: "city",
    options: {
      display: false,
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  {
    name: "state",
    options: {
      display: false,
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  {
    name: "zip",
    options: {
      display: false,
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  {
    name: "country",
    options: {
      display: false,
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },

  { name: "name", label: "Name", editable: true },
  { name: "fullContactAddress", label: "Primary Address", editable: true },
  { name: "leadSource", label: "Lead Source", editable: true },
  { name: "lastUpdateBy.name", label: "Updated By" },
  { name: "lastUpdateAt", label: "Last Updated" },
  // { name: "primaryEmail", label: "Primary Email" },
  // {
  //   name: "mobilePhone",
  //   label: "Mobile Phone",
  // },
  // {
  //   name: "homePhone",
  //   label: "Home Phone",
  // },
  // {

  {
    name: "tags",
    label: "Tags ",
    options: {
      sort: false,
      download: false,
      print: false,
      filterOptions: {
        names: [],
        logic(rowVal, pickedTags) {
          let containIts = true;
          pickedTags.map((pickedTag) => {
            if (rowVal[0].indexOf(pickedTag) === -1) {
              containIts = false;
            }
          });
          return !containIts;
        },
      },
    },
  },
  // {
  //   name: "owners", //ownerPerContactCount
  //   label: " ",
  //   options: {
  //     filter: false,
  //     searchable: false,
  //     sort: false,
  //     download: false,
  //     print: false,
  //     viewColumns: false,
  //   },
  // },
  {
    name: "commentsCounter",
    label: " ",
    options: {
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  // {
  //   name: "isTracked",
  //   label: "Track",
  //   options: {
  //     searchable: false,
  //     download: false,
  //     print: false,
  //     filterOptions: {
  //       names: ["Tracked", "Untracked"],
  //       logic(tracked, filterVal) {
  //         return !(
  //           (filterVal.indexOf("Tracked") >= 0 && tracked) ||
  //           (filterVal.indexOf("Untracked") >= 0 && !tracked)
  //         );
  //       },
  //     },
  //     filterType: "dropdown",
  //   },
  // },
];

const SearchsHeadCells = [
  {
    name: "id",
    options: {
      display: false,
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  //////////
  {
    name: "tags",
    label: "Tags ",
    options: {
      sort: false,
      download: false,
      print: false,
      filterOptions: {
        names: [],
        logic(rowVal, pickedTags) {
          let containIts = true;
          pickedTags.map((pickedTag) => {
            if (rowVal[0].indexOf(pickedTag) === -1) {
              containIts = false;
            }
          });
          return !containIts;
        },
      },
    },
  },
  {
    name: "commentsCounter",
    label: " ",
    options: {
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  {
    name: "isTracked",
    label: " ",
    options: {
      searchable: false,
      download: false,
      print: false,
      filterOptions: {
        names: ["Tracked", "Untracked"],
        logic(tracked, filterVal) {
          return !(
            (filterVal.indexOf("Tracked") >= 0 && tracked) ||
            (filterVal.indexOf("Untracked") >= 0 && !tracked)
          );
        },
      },
      filterType: "dropdown",
    },
  },
  {
    name: "coordinates",
    label: " ",
    options: {
      filter: false,
      sort: false,
      searchable: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
];

const OwnersPerParcelHeadCells = [
  {
    name: "_id",
    options: {
      display: false,
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  {
    name: "ownerEntityId",
    options: {
      display: false,
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  { name: "name", label: "Name", editable: true },
  {
    name: "entity",
    label: "Entity",
    editable: true,
    dropDownOptions: [
      "Corporation",
      "Educational Institution",
      "Governmental Body",
      "Individual",
      "Non Profit",
      "Religious Institution",
      "Trust",
      "Unknown",
    ],
  },
  {
    name: "type",
    label: "Type",
    editable: true,
    dropDownOptions: [
      "Fee Interest",
      "Leasehold",
      "Mineral Interest",
      "Non-Executive Mineral Interest (NEMI)",
      "Overriding Royalty (ORRI)",
      "Royalty Interest (NPRI)",
      "Surface Rights",
      "Unknown",
      "Working Interest",
    ],
  },
  { name: "depthFrom", label: "Depth From", editable: true },
  { name: "depthTo", label: "Depth To", editable: true },
  { name: "interest", label: "Interest", editable: true },
  { name: "nma", label: "NMA", editable: true },
  { name: "nra", label: "NRA", editable: true },
  {
    name: "tags",
    label: "Tags ",
    options: {
      sort: false,
      download: false,
      print: false,
      filterOptions: {
        names: [],
        logic(rowVal, pickedTags) {
          let containIts = true;
          pickedTags.map((pickedTag) => {
            if (rowVal[0].indexOf(pickedTag) === -1) {
              containIts = false;
            }
          });
          return !containIts;
        },
      },
    },
  },
  {
    name: "commentsCounter",
    label: " ",
    options: {
      filter: false,
      searchable: false,
      sort: false,
      download: false,
      print: false,
      viewColumns: false,
    },
  },
  {
    name: "isTracked",
    label: "Track",
    options: {
      searchable: false,
      download: false,
      print: false,
      filterOptions: {
        names: ["Tracked", "Untracked"],
        logic(tracked, filterVal) {
          return !(
            (filterVal.indexOf("Tracked") >= 0 && tracked) ||
            (filterVal.indexOf("Untracked") >= 0 && !tracked)
          );
        },
      },
      filterType: "dropdown",
    },
  },
];

////////////HeadCells end///////////////////////////////////////////////

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const joinAddress = (row) => {
  let rowData = {
    address1: row.address1,
    address2: row.address2,
    city: row.city,
    state: row.state,
    zip: row.zip,
    country: row.country,
  };
  let textArray = [];
  for (const key in rowData) {
    if (rowData.hasOwnProperty(key) && rowData[key] && rowData[key] !== "") {
      if (key === "zip" || key === "country") {
        textArray = [
          [textArray.join(", "), capitalizeFirstLetter(rowData[key])].join(" "),
        ];
      } else textArray.push(capitalizeFirstLetter(rowData[key]));
    }
  }

  return textArray.join(", ");
};

function M1nTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [stateApp, setStateApp] = useContext(AppContext);
  const [rows, Rows] = useState([]);
  const setRows = (newState) => {
    setStateIfDeepEqual(Rows, newState);
  };
  const [header, Header] = useState("");
  const setHeader = (newState) => {
    setStateIfDeepEqual(Header, newState);
  };
  const [columns, Columns] = useState([]);
  const setColumns = (newState) => {
    setStateIfDeepEqual(Columns, newState);
  };
  const [loading, Loading] = useState(true);
  const setLoading = (newState) => {
    setStateIfDeepEqual(Loading, newState);
  };
  const [addAble, AddAble] = useState(true);
  const setAddAble = (newState) => {
    setStateIfDeepEqual(AddAble, newState);
  };
  const [uploadIcon, UploadIcon] = useState(null);
  const setUploadIcon = (newState) => {
    setStateIfDeepEqual(UploadIcon, newState);
  };
  const [targetLabel, TargetLabel] = useState(null);
  const setTargetLabel = (newState) => {
    setStateIfDeepEqual(TargetLabel, newState);
  };
  const [deleteFunc, setDeleteFunc] = useState(null);
  // const setDeleteFunc = (newState) => {
  //   setStateIfDeepEqual(DeleteFunc, newState);
  // };
  const [showTracks, ShowTracks] = useState(true);
  const setShowTracks = (newState) => {
    setStateIfDeepEqual(ShowTracks, newState);
  };
  const [orderByTracks, OrderByTracks] = useState(true);
  const setOrderByTracks = (newState) => {
    setStateIfDeepEqual(OrderByTracks, newState);
  };
  const [startPaginationAt, StartPaginationAt] = useState();
  const setStartPaginationAt = (newState) => {
    setStateIfDeepEqual(StartPaginationAt, newState);
  };

  const { searchloading, searchResultData } = useSelector(
    ({ MapGridCard }) => MapGridCard
  );

  ////////////Queries begin///////////////////////////////////////////////

  const [tracksByObjectType, { data: dataTracks }] = useLazyQuery(
    TRACKSBYOBJECTTYPE,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  const [getCommentsCounter, { data: dataCommentsCounter }] = useLazyQuery(
    COMMENTSCOUNTER,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  const [getTagSamples, { data: dataTagSamples }] = useLazyQuery(TAGSAMPLES, {
    fetchPolicy: "cache-and-network",
  });
  const [getContactsCounter, { data: dataContactsCounter }] = useLazyQuery(
    CONTACSCOUNTER,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  //////////
  const [getOwners, { data: dataOwners }] = useLazyQuery(OWNERSQUERY);
  const [getOwnersWells, { data: dataOwnersWells }] = useLazyQuery(
    OWNERSWELLSQUERY
  );
  //////////
  const [getWells, { data: dataWells }] = useLazyQuery(WELLSQUERY);
  //////////
  const [getWellOwners, { data: dataWellOwners }] = useLazyQuery(
    WELLOWNERSQUERY
  );
  //////////
  const [getContactsByOwnerId, { data: dataContactsByOwnerId }] = useLazyQuery(
    CONTACTSBYOWNERSID,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  //////////
  const [getContactInM1nTable, { data: dataContact }] = useLazyQuery(CONTACT, {
    fetchPolicy: "cache-and-network",
  });
  //////////
  const [getContacts, { data: dataContacts }] = useLazyQuery(CONTACTSQUERY, {
    fetchPolicy: "cache-and-network",
  });
  //////////
  const [addRemoveOwnerToAContact] = useMutation(ADDREMOVEOWNERTOACONTACT);
  //////////
  const [removeContact] = useMutation(REMOVECONTACT);

  const [updateContact] = useMutation(UPDATECONTACT);
  //////////
  const [getCustomLayer, { data: dataCustomLayer }] = useLazyQuery(
    CUSTOMLAYER,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  //////////
  const [updateParcelOwner] = useMutation(UPDATEPARCELOWNER);

  ////////////Queries end///////////////////////////////////////////////

  ////////////General begin///////////////////////////////////////////////

  useEffect(() => {
    if (targetLabel && stateApp.user && stateApp.user.mongoId && showTracks) {
      console.log("ue mintable 1");
      setLoading(true);

      tracksByObjectType({
        variables: {
          objectType: targetLabel,
        },
      });
    }
  }, [stateApp.user, targetLabel, showTracks]);

  ////////////General end///////////////////////////////////////////////

  ////////////Tracked Owners begin///////////////////////////////////////////////
  useEffect(() => {
    if (props.parent && props.parent === "trackOwners") {
      console.log("ue mintable 2");
      setTargetLabel("owner");

      if (props.header) {
        setHeader(props.header);
      } else {
        setHeader("Owners");
      }
      setAddAble(false);
    }
  }, [props.parent, props.header]);

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "trackOwners" &&
      dataTracks &&
      dataTracks.tracksByObjectType
    ) {
      console.log("ue mintable 3");
      if (dataTracks.tracksByObjectType.length !== 0) {
        const tracksIdArray = dataTracks.tracksByObjectType.map(
          (track) => track.trackOn
        );

        getOwners({
          variables: {
            ownerIdArray: tracksIdArray,
            authToken: stateApp.user.authToken,
          },
        });
        getOwnersWells({
          variables: {
            ownersIds: tracksIdArray,
          },
        });
        getCommentsCounter({
          variables: {
            objectsIdsArray: tracksIdArray,
            userId: stateApp.user.mongoId,
          },
        });
        getTagSamples({
          variables: {
            objectsIdsArray: tracksIdArray,
            userId: stateApp.user.mongoId,
          },
        });
        // getContactsCounter({
        //   variables: { objectsIdsArray: tracksIdArray },
        // });
      } else {
        setRows([]);
        setLoading(false);
      }
    }
  }, [dataTracks]);

  useEffect(() => {
    if (props.parent && props.parent === "trackOwners" && dataOwners) {
      console.log("ue mintable 4");
      if (
        dataOwners.owners &&
        dataOwners.owners.results &&
        dataOwners.owners.results.length > 0 &&
        dataCommentsCounter &&
        dataCommentsCounter.commentsCounter &&
        // dataContactsCounter &&
        // dataContactsCounter.contactsCounter &&
        dataTagSamples &&
        dataTagSamples.tagSamples &&
        dataOwnersWells
      ) {
        dataOwners.owners.results.forEach((owner) => {
          owner.isTracked = true;
          owner.commentsCounter = 0;
          owner.tags = [[], 0];
          owner.contactsCounter = 0;
          owner.wellsCounter = [];

          if (dataOwnersWells.ownersWells) {
            for (let i = 0; i < dataOwnersWells.ownersWells.length; i++) {
              if (owner.id === dataOwnersWells.ownersWells[i].ownerId) {
                owner.wellsCounter = dataOwnersWells.ownersWells[i].wells.map(
                  (well) => well.wellId
                );
                break;
              }
            }
          }

          for (let i = 0; i < dataCommentsCounter.commentsCounter.length; i++) {
            if (owner.id === dataCommentsCounter.commentsCounter[i]._id) {
              owner.commentsCounter =
                dataCommentsCounter.commentsCounter[i].total;
              break;
            }
          }

          for (let i = 0; i < dataTagSamples.tagSamples.length; i++) {
            if (owner.id === dataTagSamples.tagSamples[i]._id) {
              owner.tags = [
                dataTagSamples.tagSamples[i].tags,
                dataTagSamples.tagSamples[i].total,
              ];

              break;
            }
          }

          // for (let i = 0; i < dataContactsCounter.contactsCounter.length; i++) {
          //   if (owner.id === dataContactsCounter.contactsCounter[i]._id) {
          //     owner.contactsCounter =
          //       dataContactsCounter.contactsCounter[i].total;
          //     break;
          //   }
          // }
        });

        let availableTags = [];
        dataTagSamples.tagSamples.map((sample) => {
          availableTags = [...availableTags, ...sample.tags];
        });
        const cleanAvailableTags = [...new Set(availableTags)];

        setRows(dataOwners.owners.results);

        setColumns(
          cleanAvailableTags.length > 0
            ? TrackedOwnersHeadCells.map((column) => {
                if (column.name === "tags") {
                  return {
                    ...column,
                    options: {
                      ...column.options,
                      filterOptions: {
                        ...column.options.filterOptions,
                        names: cleanAvailableTags,
                      },
                    },
                  };
                }
                return column;
              })
            : TrackedOwnersHeadCells.map((column) => {
                if (column.name === "tags") {
                  return {
                    ...column,
                    options: {
                      ...column.options,
                      filter: false,
                    },
                  };
                }
                return column;
              })
        );

        setStateApp((state) => ({
          ...state,
          owners: dataOwners.owners.results,
        }));
        setLoading(false);
      } else {
        if (
          dataOwners.owners &&
          dataOwners.owners.results &&
          dataOwners.owners.results.length === 0
        ) {
          setRows([]);
          setLoading(false);
        }
      }
    }
  }, [
    dataOwners,
    dataTagSamples,
    dataCommentsCounter,
    // dataContactsCounter,
    dataOwnersWells,
  ]);
  ////////////Tracked Owners end///////////////////////////////////////////////

  ////////////Tracked Wells begin///////////////////////////////////////////////
  useEffect(() => {
    if (props.parent && props.parent === "trackWells") {
      console.log("ue mintable 5");
      setTargetLabel("well");

      if (props.header) {
        setHeader(props.header);
      } else {
        setHeader("Wells");
      }
      setAddAble(false);
    }
  }, [props.parent]);

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "trackWells" &&
      dataTracks &&
      dataTracks.tracksByObjectType
    ) {
      console.log("ue mintable 6");
      if (dataTracks.tracksByObjectType.length !== 0) {
        const tracksIdArray = dataTracks.tracksByObjectType.map(
          (track) => track.trackOn
        );

        getWells({
          variables: {
            wellIdArray: tracksIdArray,
            authToken: stateApp.user.authToken,
          },
        });
        getCommentsCounter({
          variables: {
            objectsIdsArray: tracksIdArray,
            userId: stateApp.user.mongoId,
          },
        });
        getTagSamples({
          variables: {
            objectsIdsArray: tracksIdArray,
            userId: stateApp.user.mongoId,
          },
        });
      } else {
        setRows([]);
        setLoading(false);
      }
    }
  }, [dataTracks]);

  useEffect(() => {
    if (props.parent && props.parent === "trackWells" && dataWells) {
      console.log("ue mintable 7");
      if (
        dataWells.wells &&
        dataWells.wells.results &&
        dataWells.wells.results.length > 0 &&
        dataCommentsCounter &&
        dataCommentsCounter.commentsCounter &&
        dataTagSamples &&
        dataTagSamples.tagSamples
      ) {
        dataWells.wells.results.forEach((well) => {
          well.isTracked = true;
          well.commentsCounter = 0;
          well.tags = [[], 0];
          well.coordinates = [];
          if (well.longitude || well.Longitude) {
            well.coordinates.push(
              well.longitude ? well.longitude : well.Longitude
            );
          }
          if (well.latitude || well.Latitude) {
            well.coordinates.push(
              well.latitude ? well.latitude : well.Latitude
            );
          }

          for (let i = 0; i < dataCommentsCounter.commentsCounter.length; i++) {
            if (well.id === dataCommentsCounter.commentsCounter[i]._id) {
              well.commentsCounter =
                dataCommentsCounter.commentsCounter[i].total;
              break;
            }
          }
          for (let i = 0; i < dataTagSamples.tagSamples.length; i++) {
            if (well.id === dataTagSamples.tagSamples[i]._id) {
              well.tags = [
                dataTagSamples.tagSamples[i].tags,
                dataTagSamples.tagSamples[i].total,
              ];

              break;
            }
          }
        });

        let availableTags = [];
        dataTagSamples.tagSamples.map((sample) => {
          availableTags = [...availableTags, ...sample.tags];
        });
        const cleanAvailableTags = [...new Set(availableTags)];

        setRows(dataWells.wells.results);

        const flyToColumn = {
          name: "coordinates",
          label: " ",
          options: {
            filter: false,
            sort: false,
            searchable: false,
            download: false,
            print: false,
            viewColumns: false,
          },
        };

        setColumns([
          ...(cleanAvailableTags.length > 0
            ? WellsHeadCells.map((column) => {
                if (column.name === "tags") {
                  return {
                    ...column,
                    options: {
                      ...column.options,
                      filterOptions: {
                        ...column.options.filterOptions,
                        names: cleanAvailableTags,
                      },
                    },
                  };
                }
                return column;
              })
            : WellsHeadCells.map((column) => {
                if (column.name === "tags") {
                  return {
                    ...column,
                    options: {
                      ...column.options,
                      filter: false,
                    },
                  };
                }
                return column;
              })),
          flyToColumn,
        ]);

        setStateApp((state) => ({
          ...state,
          trackedwells: dataWells.wells.results,
        }));
        setLoading(false);
      } else {
        if (
          dataWells.wells &&
          dataWells.wells.results &&
          dataWells.wells.results.length === 0
        ) {
          setRows([]);
          setLoading(false);
        }
      }
    }
  }, [dataWells, dataTagSamples, dataCommentsCounter]);
  ////////////Tracked Wells end///////////////////////////////////////////////

  ////////////Wells Per Owner begin///////////////////////////////////////////

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "WellsPerOwner" &&
      props.wellsIdsArray &&
      stateApp.user &&
      stateApp.user.mongoId
    ) {
      console.log("ue mintable 8");
      setTargetLabel("well");
      setHeader("Wells");
      setAddAble(false);
      getWells({
        variables: {
          wellIdArray: props.wellsIdsArray,
          authToken: stateApp.user.authToken,
        },
      });
      getCommentsCounter({
        variables: {
          objectsIdsArray: props.wellsIdsArray,
          userId: stateApp.user.mongoId,
        },
      });
      getTagSamples({
        variables: {
          objectsIdsArray: props.wellsIdsArray,
          userId: stateApp.user.mongoId,
        },
      });
    }
  }, [props.wellsIdsArray, stateApp.user]);

  useEffect(() => {
    if (props.parent && props.parent === "WellsPerOwner" && dataWells) {
      console.log("ue mintable 9");
      if (
        dataWells.wells &&
        dataWells.wells.results &&
        dataWells.wells.results.length > 0 &&
        dataCommentsCounter &&
        dataCommentsCounter.commentsCounter &&
        dataTagSamples &&
        dataTagSamples.tagSamples &&
        dataTracks &&
        dataTracks.tracksByObjectType
      ) {
        dataWells.wells.results.forEach((well) => {
          well.isTracked = false;
          well.commentsCounter = 0;
          well.tags = [[], 0];

          for (let i = 0; i < dataTracks.tracksByObjectType.length; i++) {
            if (well.id === dataTracks.tracksByObjectType[i].trackOn) {
              well.isTracked = true;
              break;
            }
          }
          for (let i = 0; i < dataCommentsCounter.commentsCounter.length; i++) {
            if (well.id === dataCommentsCounter.commentsCounter[i]._id) {
              well.commentsCounter =
                dataCommentsCounter.commentsCounter[i].total;
              break;
            }
          }
          for (let i = 0; i < dataTagSamples.tagSamples.length; i++) {
            if (well.id === dataTagSamples.tagSamples[i]._id) {
              well.tags = [
                dataTagSamples.tagSamples[i].tags,
                dataTagSamples.tagSamples[i].total,
              ];

              break;
            }
          }
        });

        let availableTags = [];
        dataTagSamples.tagSamples.map((sample) => {
          availableTags = [...availableTags, ...sample.tags];
        });
        const cleanAvailableTags = [...new Set(availableTags)];

        setRows(dataWells.wells.results);

        setColumns(
          cleanAvailableTags.length > 0
            ? WellsHeadCells.map((column) => {
                if (column.name === "tags") {
                  return {
                    ...column,
                    options: {
                      ...column.options,
                      filterOptions: {
                        ...column.options.filterOptions,
                        names: cleanAvailableTags,
                      },
                    },
                  };
                }
                return column;
              })
            : WellsHeadCells.map((column) => {
                if (column.name === "tags") {
                  return {
                    ...column,
                    options: {
                      ...column.options,
                      filter: false,
                    },
                  };
                }
                return column;
              })
        );

        setStateApp((state) => ({
          ...state,
          wells: dataWells.wells.results,
        }));
      } else {
        setRows([]);
      }

      setLoading(false);
    }
  }, [dataWells, dataTagSamples, dataCommentsCounter, dataTracks]);

  //////////// Wells Per Owner end///////////////////////////////////////////////

  ////////////Owners Per Well begin///////////////////////////////////////////////

  useEffect(() => {
    if (props.parent && props.parent === "OwnersPerWell") {
      console.log("ue mintable 10");
      setTargetLabel("owner");
      setHeader("Owners Per Well");
      setAddAble(false);
      getWellOwners({
        variables: { id: props.selectedWell.id },
      });
    }
  }, [props.selectedWell]);

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "OwnersPerWell" &&
      dataWellOwners &&
      dataTracks &&
      dataTracks.tracksByObjectType
    ) {
      console.log("ue mintable 11");
      if (dataWellOwners.wellOwners && dataWellOwners.wellOwners.length > 0) {
        const objectsIdsArray = [];
        dataWellOwners.wellOwners.forEach((wellOwner) => {
          wellOwner.isTracked = false;
          objectsIdsArray.push(wellOwner.id);

          for (let i = 0; i < dataTracks.tracksByObjectType.length; i++) {
            if (wellOwner.id === dataTracks.tracksByObjectType[i].trackOn) {
              wellOwner.isTracked = true;
              break;
            }
          }
        });

        getOwnersWells({
          variables: {
            ownersIds: objectsIdsArray,
          },
        });
        getCommentsCounter({
          variables: { objectsIdsArray, userId: stateApp.user.mongoId },
        });
        getTagSamples({
          variables: { objectsIdsArray, userId: stateApp.user.mongoId },
        });
        // getContactsCounter({
        //   variables: { objectsIdsArray: objectsIdsArray },
        // });
      } else {
        setLoading(false);
        setRows([]);
      }
    }
  }, [dataWellOwners, dataTracks]);

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "OwnersPerWell" &&
      dataWellOwners &&
      dataWellOwners.wellOwners &&
      dataWellOwners.wellOwners.length > 0 &&
      dataCommentsCounter &&
      dataCommentsCounter.commentsCounter &&
      // dataContactsCounter &&
      // dataContactsCounter.contactsCounter &&
      dataTagSamples &&
      dataTagSamples.tagSamples &&
      dataOwnersWells
    ) {
      console.log("ue mintable 12");
      dataWellOwners.wellOwners.forEach((wellOwner) => {
        wellOwner.commentsCounter = 0;
        wellOwner.tags = [[], 0];
        wellOwner.contactsCounter = 0;
        wellOwner.wellsCounter = [];

        if (dataOwnersWells.ownersWells) {
          for (let i = 0; i < dataOwnersWells.ownersWells.length; i++) {
            if (wellOwner.id === dataOwnersWells.ownersWells[i].ownerId) {
              wellOwner.wellsCounter = dataOwnersWells.ownersWells[i].wells.map(
                (well) => well.wellId
              );
              break;
            }
          }
        }

        for (let i = 0; i < dataCommentsCounter.commentsCounter.length; i++) {
          if (wellOwner.id === dataCommentsCounter.commentsCounter[i]._id) {
            wellOwner.commentsCounter =
              dataCommentsCounter.commentsCounter[i].total;
            break;
          }
        }

        for (let i = 0; i < dataTagSamples.tagSamples.length; i++) {
          if (wellOwner.id === dataTagSamples.tagSamples[i]._id) {
            wellOwner.tags = [
              dataTagSamples.tagSamples[i].tags,
              dataTagSamples.tagSamples[i].total,
            ];

            break;
          }
        }

        // for (let i = 0; i < dataContactsCounter.contactsCounter.length; i++) {
        //   if (wellOwner.id === dataContactsCounter.contactsCounter[i]._id) {
        //     wellOwner.contactsCounter =
        //       dataContactsCounter.contactsCounter[i].total;
        //     break;
        //   }
        // }
      });

      let availableTags = [];
      dataTagSamples.tagSamples.map((sample) => {
        availableTags = [...availableTags, ...sample.tags];
      });
      const cleanAvailableTags = [...new Set(availableTags)];

      setColumns(
        cleanAvailableTags.length > 0
          ? OwnersPerWellHeadCells.map((column) => {
              if (column.name === "tags") {
                return {
                  ...column,
                  options: {
                    ...column.options,
                    filterOptions: {
                      ...column.options.filterOptions,
                      names: cleanAvailableTags,
                    },
                  },
                };
              }
              return column;
            })
          : OwnersPerWellHeadCells.map((column) => {
              if (column.name === "tags") {
                return {
                  ...column,
                  options: {
                    ...column.options,
                    filter: false,
                  },
                };
              }
              return column;
            })
      );

      setRows(dataWellOwners.wellOwners);
      setLoading(false);
    }
  }, [
    dataWellOwners,
    dataTracks,
    dataTagSamples,
    dataCommentsCounter,
    // dataContactsCounter,
    dataOwnersWells,
  ]);

  ////////////Owners Per Well end///////////////////////////////////////////////

  ////////////Owners Per Contact begin///////////////////////////////////////////////

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "ownersPerContacts" &&
      props.contactId
    ) {
      console.log("ue mintable 13");
      setTargetLabel("owner");
      setHeader("Interest Owners Tied to Contact");
      getContactInM1nTable({
        variables: {
          contactId: props.contactId,
        },
      });
    }
  }, [props.contactId]);

  useEffect(() => {
    if (
      props.contactId &&
      props.parent &&
      props.parent === "ownersPerContacts" &&
      dataContact &&
      dataContact.contact
    ) {
      console.log("ue mintable 14");
      if (dataContact.contact.owners && dataContact.contact.owners.length > 0) {
        getOwners({
          variables: {
            ownerIdArray: dataContact.contact.owners,
            authToken: stateApp.user.authToken,
          },
        });
        getOwnersWells({
          variables: {
            ownersIds: dataContact.contact.owners,
          },
        });
      } else {
        setLoading(false);
        setRows([]);
        setStateApp((state) => ({
          ...state,
          universalCircularLoaderAct: false,
        }));
      }

      setAddAble({
        parent: props.contactId,
        type: "ownerToContact",
        existingOwners: dataContact.contact.owners
          ? dataContact.contact.owners
          : [],
      });
    }
  }, [props.contactId, dataContact]);

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "ownersPerContacts" &&
      dataOwners &&
      dataTracks &&
      dataTracks.tracksByObjectType &&
      dataOwnersWells
    ) {
      console.log("ue mintable 15");
      if (
        dataOwners.owners &&
        dataOwners.owners &&
        dataOwners.owners.results.length > 0
      ) {
        const objectsIdsArray = [];
        dataOwners.owners.results.forEach((wellOwner) => {
          wellOwner.isTracked = false;
          objectsIdsArray.push(wellOwner.id);

          for (let i = 0; i < dataTracks.tracksByObjectType.length; i++) {
            if (wellOwner.id === dataTracks.tracksByObjectType[i].trackOn) {
              wellOwner.isTracked = true;
              break;
            }
          }

          wellOwner.wellsCounter = [];

          if (dataOwnersWells.ownersWells) {
            for (let i = 0; i < dataOwnersWells.ownersWells.length; i++) {
              if (wellOwner.id === dataOwnersWells.ownersWells[i].ownerId) {
                wellOwner.wellsCounter = dataOwnersWells.ownersWells[
                  i
                ].wells.map((well) => well.wellId);
                break;
              }
            }
          }
        });

        getCommentsCounter({
          variables: { objectsIdsArray, userId: stateApp.user.mongoId },
        });
        getTagSamples({
          variables: { objectsIdsArray, userId: stateApp.user.mongoId },
        });
        // getContactsCounter({
        //   variables: { objectsIdsArray: objectsIdsArray },
        // });
      } else {
        setLoading(false);
        setRows([]);
        setStateApp((state) => ({
          ...state,
          universalCircularLoaderAct: false,
        }));
      }
    }
  }, [dataOwners, dataTracks, dataOwnersWells]);

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "ownersPerContacts" &&
      dataOwners &&
      dataOwners.owners &&
      dataOwners.owners.results &&
      dataOwners.owners.results.length > 0 &&
      dataCommentsCounter &&
      dataCommentsCounter.commentsCounter &&
      // dataContactsCounter &&
      // dataContactsCounter.contactsCounter &&
      dataTagSamples &&
      dataTagSamples.tagSamples
    ) {
      console.log("ue mintable 16");
      dataOwners.owners.results.forEach((wellOwner) => {
        wellOwner.commentsCounter = 0;
        wellOwner.tags = [[], 0];
        wellOwner.contactsCounter = 0;

        for (let i = 0; i < dataCommentsCounter.commentsCounter.length; i++) {
          if (wellOwner.id === dataCommentsCounter.commentsCounter[i]._id) {
            wellOwner.commentsCounter =
              dataCommentsCounter.commentsCounter[i].total;
            break;
          }
        }

        for (let i = 0; i < dataTagSamples.tagSamples.length; i++) {
          if (wellOwner.id === dataTagSamples.tagSamples[i]._id) {
            wellOwner.tags = [
              dataTagSamples.tagSamples[i].tags,
              dataTagSamples.tagSamples[i].total,
            ];

            break;
          }
        }

        // for (let i = 0; i < dataContactsCounter.contactsCounter.length; i++) {
        //   if (wellOwner.id === dataContactsCounter.contactsCounter[i]._id) {
        //     wellOwner.contactsCounter =
        //       dataContactsCounter.contactsCounter[i].total;
        //     break;
        //   }
        // }
      });

      let availableTags = [];
      dataTagSamples.tagSamples.map((sample) => {
        availableTags = [...availableTags, ...sample.tags];
      });
      const cleanAvailableTags = [...new Set(availableTags)];

      setColumns(
        cleanAvailableTags.length > 0
          ? OwnersPerContactsHeadCells.map((column) => {
              if (column.name === "tags") {
                return {
                  ...column,
                  options: {
                    ...column.options,
                    filterOptions: {
                      ...column.options.filterOptions,
                      names: cleanAvailableTags,
                    },
                  },
                };
              }
              return column;
            })
          : OwnersPerContactsHeadCells.map((column) => {
              if (column.name === "tags") {
                return {
                  ...column,
                  options: {
                    ...column.options,
                    filter: false,
                  },
                };
              }
              return column;
            })
      );
      setRows(dataOwners.owners.results);
      setLoading(false);
      setStateApp((state) => ({ ...state, universalCircularLoaderAct: false }));
    }
  }, [
    dataOwners,
    dataTracks,
    dataTagSamples,
    dataCommentsCounter,
    // dataContactsCounter,
  ]);
  ////////////Owners Per Contact begin//////////Delete//////////////////////////////

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "ownersPerContacts" &&
      props.contactId
    ) {
      setDeleteFunc(() => (ownersIdsToDelete) => {
        if (ownersIdsToDelete) {
          setStateApp((state) => ({
            ...state,
            universalCircularLoaderAct: true,
          }));
          for (let i = 0; i < ownersIdsToDelete.length; i++) {
            addRemoveOwnerToAContact({
              variables: {
                contactId: props.contactId,
                ownerId: ownersIdsToDelete[i],
              },
              refetchQueries: [
                "getContacts",
                "getContactsByOwnerId",
                "getContactsCounter",
                "getContact",
                "getContactInM1nTable",
              ],
              awaitRefetchQueries: true,
            });
          }
        }
      });
    }
  }, [props.parent, props.contactId]);

  ////////////Owners Per Contact end/////////////////////////////////////////////////

  ////////////Contacts Per Owner begin///////////////////////////////////////////////

  useEffect(() => {
    if (props.parent && props.parent === "ownerContacts" && props.ownerId) {
      console.log("ue mintable 18");
      setTargetLabel("contact");
      setHeader("Owner's Contacts");
      setAddAble({ parent: props.ownerId, type: "contactToOwner" });
      // getContactsByOwnerId({
      //   variables: { objectId: props.ownerId },
      // });
    }
  }, [props.ownerId]);

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "ownerContacts" &&
      dataContactsByOwnerId &&
      dataTracks &&
      dataTracks.tracksByObjectType
    ) {
      console.log("ue mintable 19");
      if (
        dataContactsByOwnerId.contactsByOwnerId &&
        dataContactsByOwnerId.contactsByOwnerId.length > 0
      ) {
        const objectsIdsArray = [];
        dataContactsByOwnerId.contactsByOwnerId.forEach((contact) => {
          contact.isTracked = false;
          objectsIdsArray.push(contact._id);

          for (let i = 0; i < dataTracks.tracksByObjectType.length; i++) {
            if (contact.id === dataTracks.tracksByObjectType[i].trackOn) {
              contact.isTracked = true;
              break;
            }
          }
        });

        getCommentsCounter({
          variables: { objectsIdsArray, userId: stateApp.user.mongoId },
        });
        getTagSamples({
          variables: { objectsIdsArray, userId: stateApp.user.mongoId },
        });
      } else {
        setLoading(false);
        setRows([]);
      }
    }
  }, [dataContactsByOwnerId, dataTracks]);

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "ownerContacts" &&
      dataContactsByOwnerId &&
      dataContactsByOwnerId.contactsByOwnerId &&
      dataContactsByOwnerId.contactsByOwnerId.length > 0 &&
      dataCommentsCounter &&
      dataCommentsCounter.commentsCounter &&
      dataTagSamples &&
      dataTagSamples.tagSamples
    ) {
      console.log("ue mintable 20");
      dataContactsByOwnerId.contactsByOwnerId.forEach((contact) => {
        contact.commentsCounter = 0;
        contact.tags = [[], 0];
        // contact.fullContactAddress = joinAddress(contact);
        // contact.contactName = contact.name;

        for (let i = 0; i < dataCommentsCounter.commentsCounter.length; i++) {
          if (contact._id === dataCommentsCounter.commentsCounter[i]._id) {
            contact.commentsCounter =
              dataCommentsCounter.commentsCounter[i].total;
            break;
          }
        }

        for (let i = 0; i < dataTagSamples.tagSamples.length; i++) {
          if (contact._id === dataTagSamples.tagSamples[i]._id) {
            contact.tags = [
              dataTagSamples.tagSamples[i].tags,
              dataTagSamples.tagSamples[i].total,
            ];

            break;
          }
        }
      });

      let availableTags = [];
      dataTagSamples.tagSamples.map((sample) => {
        availableTags = [...availableTags, ...sample.tags];
      });
      const cleanAvailableTags = [...new Set(availableTags)];

      setColumns(
        cleanAvailableTags.length > 0
          ? ContactsHeadCells.map((column) => {
              if (column.name === "tags") {
                return {
                  ...column,
                  options: {
                    ...column.options,
                    filterOptions: {
                      ...column.options.filterOptions,
                      names: cleanAvailableTags,
                    },
                  },
                };
              }
              return column;
            })
          : ContactsHeadCells.map((column) => {
              if (column.name === "tags") {
                return {
                  ...column,
                  options: {
                    ...column.options,
                    filter: false,
                  },
                };
              }
              return column;
            })
      );
      setRows([...dataContactsByOwnerId.contactsByOwnerId]);
      setLoading(false);
    }
  }, [dataContactsByOwnerId, dataTracks, dataTagSamples, dataCommentsCounter]);

  ////////////Contact Per Owner begin//////////Delete//////////////////////////////

  useEffect(() => {
    if (props.parent && props.parent === "ownerContacts" && props.ownerId) {
      console.log("ue mintable 21");
      setDeleteFunc(() => (contactsIdsToDelete, completelyDelete) => {
        if (contactsIdsToDelete) {
          if (completelyDelete) {
            // for (let i = 0; i < contactsIdsToDelete.length; i++) {
            //   removeContact({
            //     variables: {
            //       contactId: contactsIdsToDelete[i],
            //     },
            //     refetchQueries: [
            //       "getContacts",
            //       "getContactsByOwnerId",
            //       "getContactsCounter",
            //       "getContact",
            //     ],
            //     awaitRefetchQueries: true,
            //   });
            // }
          } else {
            for (let i = 0; i < contactsIdsToDelete.length; i++) {
              addRemoveOwnerToAContact({
                variables: {
                  contactId: contactsIdsToDelete[i],
                  ownerId: props.ownerId,
                },
                refetchQueries: [
                  "getContacts",
                  "getContactsByOwnerId",
                  "getContactsCounter",
                  "getContact",
                  "getContactInM1nTable",
                ],
                awaitRefetchQueries: true,
              });
            }
          }
        }
      });
    }
  }, [props.parent, props.ownerId]);

  ////////////Contacts Per Owner end///////////////////////////////////////////////

  ////////////Contacts begin///////////////////////////////////////////////

  useEffect(() => {
    if (props.parent && props.parent === "Contacts") {
      console.log("ue mintable 22");
      setTargetLabel("contact");
      setHeader("Contacts");
      setAddAble({ parent: false, type: "contact" });
      getContacts();
      setUploadIcon(true);
      setStartPaginationAt(25);
    }
  }, [props.parent]);

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "Contacts" &&
      dataContacts &&
      dataTracks &&
      dataTracks.tracksByObjectType
    ) {
      console.log("ue mintable 23");
      if (dataContacts.contacts && dataContacts.contacts.length > 0) {
        const objectsIdsArray = [];
        dataContacts.contacts.forEach((contact) => {
          contact.isTracked = false;
          objectsIdsArray.push(contact._id);

          for (let i = 0; i < dataTracks.tracksByObjectType.length; i++) {
            if (contact.id === dataTracks.tracksByObjectType[i].trackOn) {
              contact.isTracked = true;
              break;
            }
          }
        });

        getCommentsCounter({
          variables: { objectsIdsArray, userId: stateApp.user.mongoId },
        });
        getTagSamples({
          variables: { objectsIdsArray, userId: stateApp.user.mongoId },
        });
      } else {
        setLoading(false);
        setRows([]);
      }
    }
  }, [dataContacts, dataTracks]);

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "Contacts" &&
      dataContacts &&
      dataContacts.contacts &&
      dataContacts.contacts.length > 0 &&
      dataCommentsCounter &&
      dataCommentsCounter.commentsCounter &&
      dataTagSamples &&
      dataTagSamples.tagSamples
    ) {
      console.log("ue mintable 24");
      dataContacts.contacts.forEach((contact) => {
        contact.commentsCounter = 0;
        contact.tags = [[], 0];
        // contact.fullContactAddress = joinAddress(contact);
        // contact.contactName = contact.name;

        for (let i = 0; i < dataCommentsCounter.commentsCounter.length; i++) {
          if (contact._id === dataCommentsCounter.commentsCounter[i]._id) {
            contact.commentsCounter =
              dataCommentsCounter.commentsCounter[i].total;
            break;
          }
        }

        for (let i = 0; i < dataTagSamples.tagSamples.length; i++) {
          if (contact._id === dataTagSamples.tagSamples[i]._id) {
            contact.tags = [
              dataTagSamples.tagSamples[i].tags,
              dataTagSamples.tagSamples[i].total,
            ];

            break;
          }
        }
      });

      let availableTags = [];
      dataTagSamples.tagSamples.map((sample) => {
        availableTags = [...availableTags, ...sample.tags];
      });
      const cleanAvailableTags = [...new Set(availableTags)];

      setColumns(
        cleanAvailableTags.length > 0
          ? ContactsHeadCells.map((column) => {
              if (column.name === "tags") {
                return {
                  ...column,
                  options: {
                    ...column.options,
                    filterOptions: {
                      ...column.options.filterOptions,
                      names: cleanAvailableTags,
                    },
                  },
                };
              }
              return column;
            })
          : ContactsHeadCells.map((column) => {
              if (column.name === "tags") {
                return {
                  ...column,
                  options: {
                    ...column.options,
                    filter: false,
                  },
                };
              }
              return column;
            })
      );
      setRows([...dataContacts.contacts]);
      setLoading(false);
    }
  }, [dataContacts, dataTracks, dataTagSamples, dataCommentsCounter]);

  ////////////Contact Delete begin////////////////////////////////////////

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "Contacts" &&
      stateApp.user &&
      stateApp.user.mongoId
    ) {
      console.log("ue mintable 25");
      setDeleteFunc(() => (contactsIdsToDelete) => {
        if (contactsIdsToDelete) {
          for (let i = 0; i < contactsIdsToDelete.length; i++) {
            updateContact({
              variables: {
                contact: {
                  _id: contactsIdsToDelete[i],
                  lastUpdateBy: stateApp.user.mongoId,
                  IsDeleted: true,
                },
              },
              refetchQueries: [
                "getContacts",
                "getContactsByOwnerId",
                "getContact",
                "getContactsCounter",
              ],
              awaitRefetchQueries: true,
            });
          }
        }
      });
    }
  }, [props.parent, stateApp.user]);

  ////////////Contacts end///////////////////////////////////////////////

  //////////// Search begin///////////////////////////////////////////////
  useEffect(() => {
    if (searchloading) {
      setLoading(true);
    }
  }, [searchloading]);

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "search" &&
      props.header &&
      props.targetLabel &&
      stateApp &&
      searchResultData &&
      stateApp.user &&
      stateApp.user.mongoId
    ) {
      setTargetLabel(props.targetLabel);
      setHeader(props.header);
      setAddAble(false);
      setOrderByTracks(false);
      setStartPaginationAt(100);
      if (searchResultData.length > 0) {
        // setLoading(true);
        const objectsIdsArray = searchResultData.map((result) => result.Id);
        if (props.showComments)
          getCommentsCounter({
            variables: { objectsIdsArray, userId: stateApp.user.mongoId },
          });
        if (props.showTags)
          getTagSamples({
            variables: { objectsIdsArray, userId: stateApp.user.mongoId },
          });
        if (props.showTracks) setShowTracks(true);
      } else {
        setShowTracks(false);
        if (!searchloading) {
          setRows([]);
          setLoading(false);
        }
      }
    }
  }, [
    props.parent,
    props.header,
    props.targetLabel,
    searchResultData,
    stateApp.user,
    props.showTracks,
    props.showComments,
    props.showTags,
    searchloading,
  ]);

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "search" &&
      stateApp &&
      searchResultData &&
      (!props.showComments ||
        (dataCommentsCounter && dataCommentsCounter.commentsCounter)) &&
      (!props.showTags || (dataTagSamples && dataTagSamples.tagSamples)) &&
      (!props.showTracks || (dataTracks && dataTracks.tracksByObjectType)) &&
      props.privateColumns
    ) {
      if (searchResultData.length > 0) {
        searchResultData.forEach((result) => {
          result.id = result.Id;

          if (props.targetLabel && props.targetLabel == "well") {
            result.coordinates = [];
            if (result.Longitude) {
              result.coordinates.push(result.Longitude);
              result.longitude = result.Longitude;
            }
            if (result.Latitude) {
              result.coordinates.push(result.Latitude);
              result.latitude = result.Latitude;
            }
          }

          if (props.showComments) {
            result.commentsCounter = 0;
            for (
              let i = 0;
              i < dataCommentsCounter.commentsCounter.length;
              i++
            ) {
              if (result.Id === dataCommentsCounter.commentsCounter[i]._id) {
                result.commentsCounter =
                  dataCommentsCounter.commentsCounter[i].total;
                break;
              }
            }
          }

          if (props.showTags) {
            result.tags = [[], 0];
            for (let i = 0; i < dataTagSamples.tagSamples.length; i++) {
              if (result.Id === dataTagSamples.tagSamples[i]._id) {
                result.tags = [
                  dataTagSamples.tagSamples[i].tags,
                  dataTagSamples.tagSamples[i].total,
                ];

                break;
              }
            }
          }

          if (props.showTracks) {
            result.isTracked = false;
            for (let i = 0; i < dataTracks.tracksByObjectType.length; i++) {
              if (result.Id === dataTracks.tracksByObjectType[i].trackOn) {
                result.isTracked = true;
                break;
              }
            }
          }
        });

        const buildingColumns = [SearchsHeadCells[0], ...props.privateColumns];

        if (props.showTags) {
          let availableTags = [];
          dataTagSamples.tagSamples.map((sample) => {
            availableTags = [...availableTags, ...sample.tags];
          });
          const cleanAvailableTags = [...new Set(availableTags)];

          buildingColumns.push(
            cleanAvailableTags.length > 0
              ? {
                  ...SearchsHeadCells[1],
                  options: {
                    ...SearchsHeadCells[1].options,
                    filterOptions: {
                      ...SearchsHeadCells[1].options.filterOptions,
                      names: cleanAvailableTags,
                    },
                  },
                }
              : {
                  ...SearchsHeadCells[1],
                  options: {
                    ...SearchsHeadCells[1].options,
                    filter: false,
                  },
                }
          );
        }
        if (props.showComments) buildingColumns.push(SearchsHeadCells[2]);
        if (props.showTracks) buildingColumns.push(SearchsHeadCells[3]);
        if (props.targetLabel && props.targetLabel == "well")
          buildingColumns.push(SearchsHeadCells[4]);

        setColumns([...buildingColumns]);
        setRows([...searchResultData]);
        setLoading(false);
      }
    }
  }, [
    props.parent,
    searchResultData,
    dataTracks,
    dataTagSamples,
    dataCommentsCounter,
    props.privateColumns,
    props.showTracks,
    props.showComments,
    props.showTags,
  ]);
  //////////// Search end///////////////////////////////////////////////

  ////////////Owners Per Parcel begin///////////////////////////////////////////////

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "ownersPerParcel" &&
      props.customLayerId
    ) {
      setTargetLabel("Parcel Owner");
      setHeader("Parcel Owners");
      setAddAble({
        type: "ownerToParcel",
        customLayerId: props.customLayerId,
      });
      getCustomLayer({
        variables: {
          id: props.customLayerId,
        },
      });
      setLoading(true);
    }
  }, [props.contactId, props.customLayerId]);

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "ownersPerParcel" &&
      dataCustomLayer &&
      dataCustomLayer.customLayer &&
      stateApp.user
    ) {
      if (
        dataCustomLayer.customLayer.owners &&
        dataCustomLayer.customLayer.owners.length > 0
      ) {
        const objectsIdsArray = dataCustomLayer.customLayer.owners.map(
          (owner) => owner._id
        );

        getCommentsCounter({
          variables: {
            objectsIdsArray,
            userId: stateApp.user.mongoId,
          },
        });
        getTagSamples({
          variables: {
            objectsIdsArray,
            userId: stateApp.user.mongoId,
          },
        });
      } else {
        setLoading(false);
        setRows([]);
      }
    }
  }, [props.parent, dataCustomLayer, stateApp.user]);

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "ownersPerParcel" &&
      dataCustomLayer &&
      dataCustomLayer.customLayer &&
      dataCustomLayer.customLayer.owners &&
      dataCustomLayer.customLayer.owners.length > 0 &&
      dataTracks &&
      dataTracks.tracksByObjectType &&
      dataCommentsCounter &&
      dataCommentsCounter.commentsCounter &&
      dataTagSamples &&
      dataTagSamples.tagSamples
    ) {
      dataCustomLayer.customLayer.owners.forEach((parcelOwner) => {
        parcelOwner.commentsCounter = 0;
        parcelOwner.tags = [[], 0];
        parcelOwner.isTracked = false;

        for (let i = 0; i < dataCommentsCounter.commentsCounter.length; i++) {
          if (parcelOwner._id === dataCommentsCounter.commentsCounter[i]._id) {
            parcelOwner.commentsCounter =
              dataCommentsCounter.commentsCounter[i].total;
            break;
          }
        }

        for (let i = 0; i < dataTagSamples.tagSamples.length; i++) {
          if (parcelOwner._id === dataTagSamples.tagSamples[i]._id) {
            parcelOwner.tags = [
              dataTagSamples.tagSamples[i].tags,
              dataTagSamples.tagSamples[i].total,
            ];

            break;
          }
        }

        for (let i = 0; i < dataTracks.tracksByObjectType.length; i++) {
          if (parcelOwner._id === dataTracks.tracksByObjectType[i].trackOn) {
            parcelOwner.isTracked = true;
            break;
          }
        }
      });

      let availableTags = [];
      dataTagSamples.tagSamples.map((sample) => {
        availableTags = [...availableTags, ...sample.tags];
      });
      const cleanAvailableTags = [...new Set(availableTags)];

      setColumns(
        cleanAvailableTags.length > 0
          ? OwnersPerParcelHeadCells.map((column) => {
              if (column.name === "tags") {
                return {
                  ...column,
                  options: {
                    ...column.options,
                    filterOptions: {
                      ...column.options.filterOptions,
                      names: cleanAvailableTags,
                    },
                  },
                };
              }
              return column;
            })
          : OwnersPerParcelHeadCells.map((column) => {
              if (column.name === "tags") {
                return {
                  ...column,
                  options: {
                    ...column.options,
                    filter: false,
                  },
                };
              }
              return column;
            })
      );
      setRows([...dataCustomLayer.customLayer.owners]);
      setLoading(false);
    }
  }, [
    props.parent,
    dataCustomLayer,
    dataTracks,
    dataTagSamples,
    dataCommentsCounter,
  ]);
  ////////////Owners Per Parcel begin//////////Delete//////////////////////////////

  useEffect(() => {
    if (
      props.parent &&
      props.parent === "ownersPerParcel" &&
      props.customLayerId
    ) {
      setDeleteFunc(() => (ownersIdsToDelete) => {
        if (ownersIdsToDelete && ownersIdsToDelete.length > 0) {
          for (let i = 0; i < ownersIdsToDelete.length; i++) {
            updateParcelOwner({
              variables: {
                parcelOwner: { _id: ownersIdsToDelete[i], IsDeleted: true },
              },
              refetchQueries: ["getCustomLayer"],
              awaitRefetchQueries: true,
            });
          }
        }
      });
    }
  }, [props.parent, props.customLayerId]);

  ////////////Owners Per Parcel end/////////////////////////////////////////////////

  ////////////-----Add your code section here-----///////////////////////

  return (
    <Container maxWidth={false} className={classes.container}>
      <Table
        style={{ backgroundColor: "#fff" }}
        header={header}
        columns={columns}
        rows={rows}
        loading={loading}
        addAble={addAble}
        targetLabel={targetLabel}
        deleteFunc={deleteFunc}
        uploadIcon={uploadIcon}
        dense={props.dense ? props.dense : undefined}
        orderByTracks={orderByTracks}
        startPaginationAt={startPaginationAt}
      />
    </Container>
  );
}

export default React.memo(M1nTable, deepEqualObjects);
