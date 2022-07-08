/**
 * @generated SignedSource<<d5a6674e18589e890772d70d6877039f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubTerminationFragment$data = {
  readonly termination: {
    readonly __typename: "ClubTermination";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubCancelActiveSupporterSubscriptionsForClubFragment" | "StaffClubTerminateFormFragment" | "StaffClubUnTerminateButtonFragment">;
  readonly " $fragmentType": "StaffClubTerminationFragment";
};
export type StaffClubTerminationFragment$key = {
  readonly " $data"?: StaffClubTerminationFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubTerminationFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubTerminationFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubTermination",
      "kind": "LinkedField",
      "name": "termination",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffClubTerminateFormFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffClubUnTerminateButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffClubCancelActiveSupporterSubscriptionsForClubFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "45928c6ce64f205d79a3c9f453ab736e";

export default node;
