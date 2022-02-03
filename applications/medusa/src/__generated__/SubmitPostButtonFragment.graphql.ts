/**
 * @generated SignedSource<<6800ac3d5094cfad4b312865c2d7bac1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmitPostButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "SubmitPostButtonFragment";
};
export type SubmitPostButtonFragment = SubmitPostButtonFragment$data;
export type SubmitPostButtonFragment$key = {
  readonly " $data"?: SubmitPostButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmitPostButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmitPostButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "d2ed74d380b83af3fcdf503c1030600f";

export default node;
