/**
 * @generated SignedSource<<8925c8da7e6a7a03216ff4c859dec26f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostVideoMediaFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ControlledVideoFragment">;
  readonly " $fragmentType": "PostVideoMediaFragment";
};
export type PostVideoMediaFragment = PostVideoMediaFragment$data;
export type PostVideoMediaFragment$key = {
  readonly " $data"?: PostVideoMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostVideoMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostVideoMediaFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ControlledVideoFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "f2bd52a5af1e60f3589d2e23f7e63d74";

export default node;
