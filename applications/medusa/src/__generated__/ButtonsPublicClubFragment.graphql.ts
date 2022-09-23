/**
 * @generated SignedSource<<801edca7cd82c9dd54559f626d6afbb4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ButtonsPublicClubFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "ButtonsPublicClubFragment";
};
export type ButtonsPublicClubFragment$key = {
  readonly " $data"?: ButtonsPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ButtonsPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ButtonsPublicClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "db66f528cc673ca36961412c712152bc";

export default node;
