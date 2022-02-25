/**
 * @generated SignedSource<<20778fc1de7f4ee9b62c410b8f503334>>
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
  readonly " $fragmentSpreads": FragmentRefs<"ClubInfractionHistoryFragment" | "IssueClubInfractionFormFragment" | "SuspendClubFormFragment">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "SuspendClubFormFragment"
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

(node as any).hash = "968f8d44962fcef7a79e315a624e94a7";

export default node;
