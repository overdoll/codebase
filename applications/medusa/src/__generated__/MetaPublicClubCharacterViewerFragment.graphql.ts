/**
 * @generated SignedSource<<4cf4653a78d3551a455a79fa4c60aae7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaPublicClubCharacterViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubCharacterViewerFragment">;
  readonly " $fragmentType": "MetaPublicClubCharacterViewerFragment";
};
export type MetaPublicClubCharacterViewerFragment$key = {
  readonly " $data"?: MetaPublicClubCharacterViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaPublicClubCharacterViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaPublicClubCharacterViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerPublicClubCharacterViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "d7d80cbe398fbf690afdfc475472f504";

export default node;
