/**
 * @generated SignedSource<<77c7014e1ee9db742cb77d5cbd00c619>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaLikedPostsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerLikedPostsViewerFragment">;
  readonly " $fragmentType": "MetaLikedPostsViewerFragment";
};
export type MetaLikedPostsViewerFragment$key = {
  readonly " $data"?: MetaLikedPostsViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaLikedPostsViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaLikedPostsViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerLikedPostsViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "d8c490cac6d329b4debd3d31c47f2c58";

export default node;
