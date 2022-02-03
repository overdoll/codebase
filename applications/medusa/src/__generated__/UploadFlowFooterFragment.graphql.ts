/**
 * @generated SignedSource<<7ecc03f551a7ebbaf8394748c2ee4e17>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadFlowFooterFragment.graphql.ts
export type UploadFlowFooterFragment = {
    readonly " $fragmentRefs": FragmentRefs<"UpdateContentButtonFragment" | "UpdateAudienceButton" | "UpdateCategoryButtonFragment" | "UpdateCharacterButtonFragment" | "SubmitPostButtonFragment">;
    readonly " $refType": "UploadFlowFooterFragment";
};
export type UploadFlowFooterFragment$data = UploadFlowFooterFragment;
export type UploadFlowFooterFragment$key = {
    readonly " $data"?: UploadFlowFooterFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UploadFlowFooterFragment">;
=======
export type FlowForwardButtonFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SubmitPostButtonFragment" | "UpdateAudienceButton" | "UpdateCategoryButtonFragment" | "UpdateCharacterButtonFragment" | "UpdateContentButtonFragment">;
  readonly " $fragmentType": "FlowForwardButtonFragment";
};
export type FlowForwardButtonFragment = FlowForwardButtonFragment$data;
export type FlowForwardButtonFragment$key = {
  readonly " $data"?: FlowForwardButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FlowForwardButtonFragment">;
>>>>>>> master:applications/medusa/src/__generated__/FlowForwardButtonFragment.graphql.ts
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadFlowFooterFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateContentButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateAudienceButton"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateCategoryButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateCharacterButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubmitPostButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadFlowFooterFragment.graphql.ts
(node as any).hash = '51b3f4d05c345fccbeea5ea0491b989d';
=======

(node as any).hash = "570586559fa6fc58fa445093415a1033";

>>>>>>> master:applications/medusa/src/__generated__/FlowForwardButtonFragment.graphql.ts
export default node;
