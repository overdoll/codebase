/**
 * @generated SignedSource<<cb5f2bb2ad6f868c1b1edc6b8307fd28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaPublicClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubViewerFragment">;
  readonly " $fragmentType": "MetaPublicClubViewerFragment";
};
export type MetaPublicClubViewerFragment$key = {
  readonly " $data"?: MetaPublicClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaPublicClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaPublicClubViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerPublicClubViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "31dde40e3c54f3e12df79ea2e0089cfd";

export default node;
