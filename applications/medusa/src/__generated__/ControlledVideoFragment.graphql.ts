/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ControlledVideoFragment = {
    readonly " $fragmentRefs": FragmentRefs<"VideoSnippetFragment">;
    readonly " $refType": "ControlledVideoFragment";
};
export type ControlledVideoFragment$data = ControlledVideoFragment;
export type ControlledVideoFragment$key = {
    readonly " $data"?: ControlledVideoFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ControlledVideoFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ControlledVideoFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "VideoSnippetFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};
(node as any).hash = '11c70b10cfd8ef5a21559239403081b7';
export default node;
