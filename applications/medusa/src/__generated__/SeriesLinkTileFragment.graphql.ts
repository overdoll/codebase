/**
 * @generated SignedSource<<c2fe9bbae866fa2b91125650f8937b1d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesLinkTileFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "SeriesLinkTileFragment";
};
export type SeriesLinkTileFragment$key = {
  readonly " $data"?: SeriesLinkTileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesLinkTileFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SeriesLinkTileFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "76386258df7ae0f38dfbb23508d83913";

export default node;
