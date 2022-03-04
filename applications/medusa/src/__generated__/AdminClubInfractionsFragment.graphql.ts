/**
 * @generated SignedSource<<2a734f349d71acbcf35ea39c9f702d2a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminClubInfractionsFragment$data = {
  readonly suspension: {
    readonly __typename: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubInfractionHistoryFragment" | "IssueClubInfractionFormFragment">;
  readonly " $fragmentType": "AdminClubInfractionsFragment";
};
export type AdminClubInfractionsFragment = AdminClubInfractionsFragment$data;
export type AdminClubInfractionsFragment$key = {
  readonly " $data"?: AdminClubInfractionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminClubInfractionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminClubInfractionsFragment",
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

(node as any).hash = "9a26c9b74c0656c82ee0c93a4d98472f";

export default node;
