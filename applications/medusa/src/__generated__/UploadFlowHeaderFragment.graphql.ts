/**
 * @generated SignedSource<<f86f241537b6db8cf0054ccf12351dfe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadFlowHeaderFragment.graphql.ts
export type UploadFlowHeaderFragment = {
    readonly " $fragmentRefs": FragmentRefs<"ProcessContentFragment">;
    readonly " $refType": "UploadFlowHeaderFragment";
};
export type UploadFlowHeaderFragment$data = UploadFlowHeaderFragment;
export type UploadFlowHeaderFragment$key = {
    readonly " $data"?: UploadFlowHeaderFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UploadFlowHeaderFragment">;
=======
export type FlowFooterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FlowForwardButtonFragment">;
  readonly " $fragmentType": "FlowFooterFragment";
};
export type FlowFooterFragment = FlowFooterFragment$data;
export type FlowFooterFragment$key = {
  readonly " $data"?: FlowFooterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FlowFooterFragment">;
>>>>>>> master:applications/medusa/src/__generated__/FlowFooterFragment.graphql.ts
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadFlowHeaderFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProcessContentFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadFlowHeaderFragment.graphql.ts
(node as any).hash = '02267550f973fec42a31a381ed224a6c';
=======

(node as any).hash = "d166dc317911679a6b21a2f779ae9498";

>>>>>>> master:applications/medusa/src/__generated__/FlowFooterFragment.graphql.ts
export default node;
