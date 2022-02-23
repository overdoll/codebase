/**
 * @generated SignedSource<<8ecc32e8af0f74a3de740f612820928d>>
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
    readonly expires: any;
  } | null;
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
          "name": "expires",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "257f1f137d87dbf3d51673a02c8f3915";

export default node;
