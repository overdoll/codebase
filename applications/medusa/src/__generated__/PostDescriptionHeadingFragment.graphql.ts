/**
 * @generated SignedSource<<11d520a859f899978096a94bb19f5b1d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostDescriptionHeadingFragment$data = {
  readonly description: string;
  readonly " $fragmentType": "PostDescriptionHeadingFragment";
};
export type PostDescriptionHeadingFragment$key = {
  readonly " $data"?: PostDescriptionHeadingFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostDescriptionHeadingFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostDescriptionHeadingFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "95fe688713ad4a2dae7f70e7718b9304";

export default node;
