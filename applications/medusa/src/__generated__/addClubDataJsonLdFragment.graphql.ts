/**
 * @generated SignedSource<<af09846407ba901eec11e2418cd268fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type addClubDataJsonLdFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "addClubDataJsonLdFragment";
};
export type addClubDataJsonLdFragment$key = {
  readonly " $data"?: addClubDataJsonLdFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"addClubDataJsonLdFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "addClubDataJsonLdFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
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

(node as any).hash = "92ce6c84efb6952a8175877eff9193d1";

export default node;
