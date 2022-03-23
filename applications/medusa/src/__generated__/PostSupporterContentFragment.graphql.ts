/**
 * @generated SignedSource<<73e4068f712e499fb9509074964ffb35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostSupporterContentFragment$data = {
  readonly viewerCanViewSupporterOnlyContent: boolean;
  readonly isSupporterOnly: boolean;
  readonly " $fragmentType": "PostSupporterContentFragment";
};
export type PostSupporterContentFragment = PostSupporterContentFragment$data;
export type PostSupporterContentFragment$key = {
  readonly " $data"?: PostSupporterContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostSupporterContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerCanViewSupporterOnlyContent",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSupporterOnly",
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "ba704ba0b7129177ff261e3d6b0c4f1c";

export default node;
