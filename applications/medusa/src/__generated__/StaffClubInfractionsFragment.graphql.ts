/**
 * @generated SignedSource<<b8fdbb6c6230e4197d8500e4f1ad6528>>
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
    readonly __typename: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubInfractionHistoryFragment" | "IssueClubInfractionFormFragment">;
  readonly " $fragmentType": "StaffClubInfractionsFragment";
};
export type StaffClubInfractionsFragment = StaffClubInfractionsFragment$data;
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
