/**
 * @generated SignedSource<<9e24a45f6ef1d7257b00fe4f8647fb8b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CategoryLinkTileFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "CategoryLinkTileFragment";
};
export type CategoryLinkTileFragment$key = {
  readonly " $data"?: CategoryLinkTileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CategoryLinkTileFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoryLinkTileFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "ce1fdd2e8450c71dc7334590b2a2284a";

export default node;
