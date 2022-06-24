/**
 * @generated SignedSource<<835777a12a2f2ce661104a265fa6e6a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubInfractionsFragment$data = {
  readonly suspension: {
    readonly __typename: "ClubSuspension";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubInfractionHistoryFragment" | "IssueClubInfractionFormFragment">;
  readonly " $fragmentType": "StaffClubInfractionsFragment";
};
export type StaffClubInfractionsFragment$key = {
  readonly " $data"?: StaffClubInfractionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubInfractionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubInfractionsFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubInfractionHistoryFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "IssueClubInfractionFormFragment"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubSuspension",
      "kind": "LinkedField",
      "name": "suspension",
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "65fdc4458051cc10ce3833647ac7e065";

export default node;
